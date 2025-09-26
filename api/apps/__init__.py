#
#  Copyright 2024 The InfiniFlow Authors. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License");
#  you may not use this file except in compliance with the License.
#  You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  Unless required by applicable law or agreed to in writing, software
#  distributed under the License is distributed on an "AS IS" BASIS,
#  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#  See the License for the specific language governing permissions and
#  limitations under the License.
#
import os
import sys
import logging
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path
from flask import Blueprint, Flask
from werkzeug.wrappers.request import Request
from flask_cors import CORS
from flasgger import Swagger
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer

from api.db import StatusEnum
from api.db.db_models import close_connection
from api.db.services import UserService
from api.utils import CustomJSONEncoder, commands

from flask_mail import Mail
from flask_session import Session
from flask_login import LoginManager
from api import settings
from api.utils.api_utils import server_error_response
from api.constants import API_VERSION

__all__ = ["app"]

Request.json = property(lambda self: self.get_json(force=True, silent=True))

app = Flask(__name__)
smtp_mail_server = Mail()

# Add this at the beginning of your file to configure Swagger UI
swagger_config = {
    "headers": [],
    "specs": [
        {
            "endpoint": "apispec",
            "route": "/apispec.json",
            "rule_filter": lambda rule: True,  # Include all endpoints
            "model_filter": lambda tag: True,  # Include all models
        }
    ],
    "static_url_path": "/flasgger_static",
    "swagger_ui": True,
    "specs_route": "/apidocs/",
}

swagger = Swagger(
    app,
    config=swagger_config,
    template={
        "swagger": "2.0",
        "info": {
            "title": "RAGFlow API",
            "description": "",
            "version": "1.0.0",
        },
        "securityDefinitions": {
            "ApiKeyAuth": {"type": "apiKey", "name": "Authorization", "in": "header"}
        },
    },
)

CORS(app, supports_credentials=True, max_age=2592000)
app.url_map.strict_slashes = False
app.json_encoder = CustomJSONEncoder
app.errorhandler(Exception)(server_error_response)

## convince for dev and debug
# app.config["LOGIN_DISABLED"] = True
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["MAX_CONTENT_LENGTH"] = int(
    os.environ.get("MAX_CONTENT_LENGTH", 1024 * 1024 * 1024)
)

Session(app)
login_manager = LoginManager()
login_manager.init_app(app)

commands.register_commands(app)


def search_pages_path(pages_dir):
    app_path_list = [
        path for path in pages_dir.glob("*_app.py") if not path.name.startswith(".")
    ]
    api_path_list = [
        path for path in pages_dir.glob("*sdk/*.py") if not path.name.startswith(".")
    ]
    app_path_list.extend(api_path_list)
    return app_path_list


def register_page(page_path):
    path = f"{page_path}"

    page_name = page_path.stem.removesuffix("_app")
    module_name = ".".join(
        page_path.parts[page_path.parts.index("api"): -1] + (page_name,)
    )

    spec = spec_from_file_location(module_name, page_path)
    page = module_from_spec(spec)
    page.app = app
    page.manager = Blueprint(page_name, module_name)
    sys.modules[module_name] = page
    spec.loader.exec_module(page)
    page_name = getattr(page, "page_name", page_name)
    sdk_path = "\\sdk\\" if sys.platform.startswith("win") else "/sdk/"
    url_prefix = (
        f"/api/{API_VERSION}" if sdk_path in path else f"/{API_VERSION}/{page_name}"
    )

    app.register_blueprint(page.manager, url_prefix=url_prefix)
    return url_prefix


pages_dir = [
    Path(__file__).parent,
    Path(__file__).parent.parent / "api" / "apps",
    Path(__file__).parent.parent / "api" / "apps" / "sdk",
]

client_urls_prefix = [
    register_page(path) for dir in pages_dir for path in search_pages_path(dir)
]


@login_manager.request_loader
def load_user(web_request):
    # 1. 首先检查Coze的cookie认证
    coze_session_token = web_request.cookies.get("session_key")
    if coze_session_token:
        try:
            from api.utils.coze_auth import CozeAuthHelper

            # 使用跨系统认证工具
            user = CozeAuthHelper.authenticate_user(coze_session_token)
            if user:
                logging.info(f"✅ 跨系统认证成功: {user.email}")
                return user

            # 向后兼容：如果跨系统认证失败，尝试原有的token匹配方式
            legacy_user = UserService.query(
                access_token=coze_session_token, status=StatusEnum.VALID.value
            )
            if legacy_user and len(legacy_user) > 0:
                logging.info(f"✅ 传统认证成功: {legacy_user[0].email}")
                return legacy_user[0]

        except Exception as e:
            logging.warning(f"Coze认证失败: {e}")
            import traceback
            traceback.print_exc()

    # 2. 然后检查Authorization头部认证
    authorization = web_request.headers.get("Authorization")
    if authorization:
        try:
            # 优先尝试作为coze-studio的session_key
            if not authorization.startswith("YnetFlow-"):
                # 这是coze的session_key，直接查询
                user = UserService.query(
                    access_token=authorization, status=StatusEnum.VALID.value
                )
                if user and len(user) > 0:
                    return user[0]
            else:
                # 这是RAGFlow格式的token，尝试JWT解析（向后兼容）
                jwt = Serializer(secret_key=settings.SECRET_KEY)
                try:
                    access_token = str(jwt.loads(authorization))

                    if not access_token or not access_token.strip():
                        logging.warning("Authentication attempt with empty access token")
                        return None

                    # Access tokens should be UUIDs (32 hex characters)
                    if len(access_token.strip()) < 32:
                        logging.warning(f"Authentication attempt with invalid token format: {len(access_token)} chars")
                        return None

                    user = UserService.query(
                        access_token=access_token, status=StatusEnum.VALID.value
                    )
                    if user:
                        if not user[0].access_token or not user[0].access_token.strip():
                            logging.warning(f"User {user[0].email} has empty access_token in database")
                            return None
                        return user[0]
                except:
                    # JWT解析失败，作为普通token处理
                    user = UserService.query(
                        access_token=authorization, status=StatusEnum.VALID.value
                    )
                    if user and len(user) > 0:
                        return user[0]

            return None
        except Exception as e:
            logging.warning(f"load_user got exception {e}")
            return None
    else:
        return None


@app.before_request
def handle_session_key_from_url():
    """
    全局中间件：处理URL参数中的session_key，实现免密登录
    如果URL中包含session_key参数，自动将其设置为cookie并使用该token登录
    """
    from flask import request, make_response, redirect

    # 获取URL中的session_key参数
    session_key = request.args.get('session_key')

    if session_key:
        try:
            logging.info(f"检测到URL中的session_key参数: {session_key[:10]}...")

            # 验证session_key是否有效
            from api.utils.coze_auth import CozeAuthHelper
            user = CozeAuthHelper.authenticate_user(session_key)

            if not user:
                # 尝试使用传统方式验证
                users = UserService.query(
                    access_token=session_key,
                    status=StatusEnum.VALID.value
                )
                if users and len(users) > 0:
                    user = users[0]

            if user:
                logging.info(f"✅ session_key验证成功，用户: {user.email}")

                # 构建没有session_key参数的URL
                args = request.args.copy()
                args.pop('session_key', None)

                # 重构URL
                if args:
                    from urllib.parse import urlencode
                    new_url = f"{request.path}?{urlencode(args)}"
                else:
                    new_url = request.path

                # 创建响应并设置cookie
                response = make_response(redirect(new_url, code=302))
                response.set_cookie(
                    'session_key',
                    session_key,
                    max_age=30*24*60*60,  # 30天有效期
                    httponly=True,
                    secure=request.is_secure,  # 如果是HTTPS则设置secure标志
                    samesite='Lax'  # 防止CSRF攻击
                )

                logging.info(f"已设置session_key cookie并重定向到: {new_url}")
                return response
            else:
                logging.warning(f"⚠️ 无效的session_key: {session_key[:10]}...")

        except Exception as e:
            logging.error(f"处理session_key时出错: {e}")
            import traceback
            traceback.print_exc()

    # 如果没有session_key参数或处理失败，继续正常流程
    return None


@app.teardown_request
def _db_close(exc):
    close_connection()
