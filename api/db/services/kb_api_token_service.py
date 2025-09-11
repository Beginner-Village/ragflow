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

from datetime import datetime, timedelta
import peewee

from api.db.db_models import DB, KnowledgebaseAPIToken
from api.db.services.common_service import CommonService
from api.utils import current_timestamp, datetime_format, get_uuid
from api.utils.api_utils import generate_confirmation_token


class KnowledgebaseAPITokenService(CommonService):
    model = KnowledgebaseAPIToken

    @classmethod
    @DB.connection_context()
    def create_kb_token(cls, kb_id, tenant_id, created_by, name=None, description=None, 
                       permissions=None, expires_days=None):
        """
        Create a new API token for a specific knowledge base
        """
        if permissions is None:
            permissions = ['read']
        
        token_id = get_uuid()
        token = generate_confirmation_token(f"{kb_id}_{tenant_id}", token_type="kb")
        
        expires_at = None
        if expires_days:
            expires_at = datetime.now() + timedelta(days=expires_days)
        
        token_data = {
            'id': token_id,
            'kb_id': kb_id,
            'tenant_id': tenant_id,
            'token': token,
            'name': name or f"API Key for KB {kb_id}",
            'description': description,
            'permissions': permissions,
            'status': 'active',
            'expires_at': expires_at,
            'created_by': created_by,
            'create_time': current_timestamp(),
            'create_date': datetime_format(datetime.now()),
        }
        
        if cls.save(**token_data):
            return cls.get_by_id(token_id)
        return None

    @classmethod
    @DB.connection_context()
    def get_by_kb_id(cls, kb_id, tenant_id, status='active'):
        """
        Get all API tokens for a specific knowledge base
        """
        query = cls.model.select().where(
            (cls.model.kb_id == kb_id) &
            (cls.model.tenant_id == tenant_id)
        )
        
        if status:
            query = query.where(cls.model.status == status)
            
        return query.order_by(cls.model.create_time.desc())

    @classmethod
    @DB.connection_context()
    def get_by_token(cls, token):
        """
        Get API token by token string
        """
        try:
            return cls.model.select().where(
                (cls.model.token == token) &
                (cls.model.status == 'active')
            ).get()
        except cls.model.DoesNotExist:
            return None

    @classmethod
    @DB.connection_context()
    def verify_token_for_kb(cls, token, kb_id, required_permission='read'):
        """
        Verify if a token has permission to access a specific knowledge base
        """
        try:
            token_record = cls.model.select().where(
                (cls.model.token == token) &
                (cls.model.kb_id == kb_id) &
                (cls.model.status == 'active')
            ).get()
            
            # Check if token is expired
            if token_record.expires_at and token_record.expires_at < datetime.now():
                return False
            
            # Check permissions
            permissions = token_record.permissions or ['read']
            return required_permission in permissions
            
        except cls.model.DoesNotExist:
            return False

    @classmethod
    @DB.connection_context()
    def update_token_status(cls, token_id, tenant_id, status):
        """
        Update token status (active/disabled)
        """
        return cls.model.update({
            'status': status,
            'update_time': current_timestamp(),
            'update_date': datetime_format(datetime.now()),
        }).where(
            (cls.model.id == token_id) &
            (cls.model.tenant_id == tenant_id)
        ).execute()

    @classmethod
    @DB.connection_context()
    def delete_kb_token(cls, token_id, tenant_id):
        """
        Delete an API token
        """
        return cls.model.delete().where(
            (cls.model.id == token_id) &
            (cls.model.tenant_id == tenant_id)
        ).execute()

    @classmethod
    @DB.connection_context()
    def get_kb_permissions(cls, token):
        """
        Get knowledge base permissions for a token
        """
        try:
            token_record = cls.model.select().where(
                (cls.model.token == token) &
                (cls.model.status == 'active')
            ).get()
            
            # Check if token is expired
            if token_record.expires_at and token_record.expires_at < datetime.now():
                return None
                
            return {
                'kb_id': token_record.kb_id,
                'tenant_id': token_record.tenant_id,
                'permissions': token_record.permissions or ['read']
            }
            
        except cls.model.DoesNotExist:
            return None