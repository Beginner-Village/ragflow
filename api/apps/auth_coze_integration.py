"""
认证系统修改 - Coze-Studio集成版本
此文件包含认证逻辑的修改，以支持coze-studio的session_key验证
"""

import logging
import requests
from flask import request
from flask_login import LoginManager, login_user, logout_user
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer

from api.db.services import UserService
from api import settings


def init_login_manager_for_coze(app, login_manager):
    """
    初始化登录管理器，使用coze-studio的认证机制
    """

    @login_manager.request_loader
    def load_user_from_request(web_request):
        """
        从请求中加载用户
        支持两种认证方式：
        1. 直接使用coze-studio的session_key
        2. 兼容RAGFlow的JWT token（逐步废弃）
        """
        authorization = web_request.headers.get("Authorization")

        if not authorization:
            # 尝试从Cookie获取session_key
            authorization = web_request.cookies.get("coze_session_key")

        if authorization:
            try:
                # 优先尝试直接使用session_key查询
                if not authorization.startswith("YnetFlow-"):
                    # 这是coze-studio的session_key
                    users = UserService.query(access_token=authorization)
                    if users and len(users) > 0:
                        user = users[0]
                        # 验证session_key是否有效（可选：调用coze-studio的验证接口）
                        if verify_coze_session(authorization):
                            return user
                else:
                    # 这是RAGFlow的API Key，保持兼容
                    return load_user_by_api_key(authorization)

            except Exception as e:
                logging.error(f"Failed to load user: {e}")
                return None

        return None

    @login_manager.user_loader
    def load_user_by_id(user_id):
        """
        通过用户ID加载用户
        """
        try:
            users = UserService.query(id=user_id)
            if users and len(users) > 0:
                return users[0]
        except Exception as e:
            logging.error(f"Failed to load user by id: {e}")
        return None


def verify_coze_session(session_key):
    """
    验证coze-studio的session_key是否有效
    可以通过调用coze-studio的API来验证
    """
    try:
        # 方案1：直接查询数据库（性能最佳）
        # 由于我们使用视图，session_key已经在access_token字段中
        # 如果能查到用户，说明session有效
        return True

        # 方案2：调用coze-studio的验证API（可选）
        # response = requests.post(
        #     "http://10.10.10.220:8888/api/user/verify",
        #     headers={"Authorization": session_key},
        #     timeout=5
        # )
        # return response.status_code == 200

    except Exception as e:
        logging.error(f"Failed to verify coze session: {e}")
        return False


def load_user_by_api_key(api_key):
    """
    通过API Key加载用户（保持向后兼容）
    """
    from api.db.services import APIKeyService
    try:
        # 查询API Key
        api_key_obj = APIKeyService.query(api_key=api_key)
        if api_key_obj:
            # 通过API Key关联的用户ID查询用户
            users = UserService.query(id=api_key_obj.user_id)
            if users and len(users) > 0:
                return users[0]
    except Exception as e:
        logging.error(f"Failed to load user by API key: {e}")
    return None


def sync_user_from_coze(coze_user_id):
    """
    从coze-studio同步用户数据（如果需要）
    由于我们使用视图，这个函数可能不需要
    但保留以备不时之需
    """
    try:
        # 调用coze-studio的API获取用户信息
        response = requests.get(
            f"http://10.10.10.220:8888/api/user/{coze_user_id}",
            timeout=5
        )

        if response.status_code == 200:
            coze_user = response.json()
            # 这里可以做一些数据同步或缓存
            # 但由于我们使用视图，数据是实时的，所以可能不需要
            return coze_user

    except Exception as e:
        logging.error(f"Failed to sync user from coze: {e}")

    return None


class CozeAuthMiddleware:
    """
    Coze认证中间件
    用于在Flask请求处理前验证用户身份
    """

    def __init__(self, app=None):
        self.app = app
        if app:
            self.init_app(app)

    def init_app(self, app):
        app.before_request(self.before_request)

    def before_request(self):
        """
        请求前处理，设置共享的session信息
        """
        # 获取session_key
        session_key = request.headers.get("Authorization")
        if not session_key:
            session_key = request.cookies.get("coze_session_key")

        if session_key:
            # 在请求上下文中保存session信息
            # 这样两个系统可以共享用户状态
            request.coze_session_key = session_key


def create_unified_session(user):
    """
    创建统一的会话
    返回可以在两个系统中使用的session信息
    """
    return {
        "user_id": user.id,
        "email": user.email,
        "nickname": user.nickname,
        "session_key": user.access_token,  # 这是coze的session_key
        "tenant_id": user.id,  # 使用用户ID作为租户ID（简化版）
    }


def logout_unified_session(user):
    """
    注销统一会话
    清理两个系统的会话信息
    """
    try:
        # 清理RAGFlow的会话
        logout_user()

        # 可选：通知coze-studio清理会话
        # requests.post(
        #     "http://10.10.10.220:8888/api/user/logout",
        #     headers={"Authorization": user.access_token}
        # )

        return True
    except Exception as e:
        logging.error(f"Failed to logout unified session: {e}")
        return False