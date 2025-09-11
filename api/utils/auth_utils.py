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

from datetime import datetime
from functools import wraps
from flask import request
from api.db.services.common_service import CommonService
from api.db.services.kb_api_token_service import KnowledgebaseAPITokenService
from api.db.db_models import APIToken
from api.utils.api_utils import get_json_result
from api import settings


class AuthInfo:
    """Authentication information container"""
    def __init__(self, auth_type, tenant_id, token=None, kb_id=None, permissions=None):
        self.auth_type = auth_type  # 'system' or 'kb'
        self.tenant_id = tenant_id
        self.token = token
        self.kb_id = kb_id  # Only for KB tokens
        self.permissions = permissions or ['read']


def get_token_from_request():
    """Extract token from Authorization header"""
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None
    return auth_header[7:]  # Remove 'Bearer ' prefix


def verify_system_token(token):
    """Verify system-level API token (yf-sys- prefix only)"""
    try:
        # Only support new format system tokens
        if token.startswith('yf-sys-'):
            token_record = APIToken.get(APIToken.token == token)
            return AuthInfo(
                auth_type='system',
                tenant_id=token_record.tenant_id,
                token=token,
                permissions=['read', 'write', 'delete']  # System tokens have full permissions
            )
        
        return None
    except APIToken.DoesNotExist:
        return None


def verify_kb_token(token):
    """Verify knowledge base-level API token (yf-kb-)"""
    if not token.startswith('yf-kb-'):
        return None
        
    try:
        token_record = KnowledgebaseAPITokenService.get_by_token(token)
        if not token_record:
            return None
            
        # Check if token is expired
        if token_record.expires_at and token_record.expires_at < datetime.now():
            return None
            
        return AuthInfo(
            auth_type='kb',
            tenant_id=token_record.tenant_id,
            token=token,
            kb_id=token_record.kb_id,
            permissions=token_record.permissions or ['read']
        )
    except Exception:
        return None


def verify_api_token(token):
    """Unified token verification function"""
    if not token:
        return None
        
    # Try KB token first (more specific)
    auth_info = verify_kb_token(token)
    if auth_info:
        return auth_info
        
    # Try system token
    auth_info = verify_system_token(token)
    if auth_info:
        return auth_info
        
    return None


def check_kb_permission(auth_info, kb_id, required_permission='read'):
    """Check if auth_info has permission to access specific knowledge base"""
    if not auth_info:
        return False
        
    # System tokens can access all knowledge bases
    if auth_info.auth_type == 'system':
        return True
        
    # KB tokens can only access their specific knowledge base
    if auth_info.auth_type == 'kb':
        if auth_info.kb_id != kb_id:
            return False
        return required_permission in auth_info.permissions
        
    return False


def api_auth_required(required_permission='read', kb_id_param=None):
    """
    API authentication decorator
    
    Args:
        required_permission: Required permission level ('read', 'write', 'delete')
        kb_id_param: Parameter name to extract kb_id from request (for KB-specific operations)
    """
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            token = get_token_from_request()
            if not token:
                return get_json_result(
                    data=False,
                    message='Missing authorization token',
                    code=settings.RetCode.AUTHENTICATION_ERROR
                )
                
            auth_info = verify_api_token(token)
            if not auth_info:
                return get_json_result(
                    data=False,
                    message='Invalid token',
                    code=settings.RetCode.AUTHENTICATION_ERROR
                )
            
            # For KB-specific operations, check KB permissions
            if kb_id_param:
                kb_id = None
                if kb_id_param in kwargs:
                    kb_id = kwargs[kb_id_param]
                elif hasattr(request, 'json') and request.json and kb_id_param in request.json:
                    kb_id = request.json[kb_id_param]
                
                if kb_id and not check_kb_permission(auth_info, kb_id, required_permission):
                    return get_json_result(
                        data=False,
                        message='Insufficient permissions for this knowledge base',
                        code=settings.RetCode.AUTHENTICATION_ERROR
                    )
            
            # Add auth_info to request for use in the endpoint
            request.auth_info = auth_info
            return f(*args, **kwargs)
        return wrapper
    return decorator


# Legacy compatibility function
def token_required(f):
    """Legacy token authentication decorator for backward compatibility"""
    return api_auth_required()(f)