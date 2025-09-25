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
import hashlib
from datetime import datetime
import logging

import peewee
from werkzeug.security import generate_password_hash, check_password_hash

from api.db import UserTenantRole
from api.db.db_models import DB, UserTenant
from api.db.db_models import User, Tenant, TenantConfig
from api.db.services.common_service import CommonService
from api.utils import get_uuid, current_timestamp, datetime_format
from api.db import StatusEnum
from rag.settings import MINIO


class UserService(CommonService):
    """Service class for managing user-related database operations.

    This class extends CommonService to provide specialized functionality for user management,
    including authentication, user creation, updates, and deletions.

    Attributes:
        model: The User model class for database operations.
    """
    model = User

    @classmethod
    @DB.connection_context()
    def query(cls, cols=None, reverse=None, order_by=None, **kwargs):
        if 'access_token' in kwargs:
            access_token = kwargs['access_token']
            
            # Reject empty, None, or whitespace-only access tokens
            if not access_token or not str(access_token).strip():
                logging.warning("UserService.query: Rejecting empty access_token query")
                return cls.model.select().where(cls.model.id == "INVALID_EMPTY_TOKEN")  # Returns empty result
            
            # Reject tokens that are too short (should be UUID, 32+ chars)
            if len(str(access_token).strip()) < 32:
                logging.warning(f"UserService.query: Rejecting short access_token query: {len(str(access_token))} chars")
                return cls.model.select().where(cls.model.id == "INVALID_SHORT_TOKEN")  # Returns empty result
            
            # Reject tokens that start with "INVALID_" (from logout)
            if str(access_token).startswith("INVALID_"):
                logging.warning("UserService.query: Rejecting invalidated access_token")
                return cls.model.select().where(cls.model.id == "INVALID_LOGOUT_TOKEN")  # Returns empty result
        
        # Call parent query method for valid requests
        return super().query(cols=cols, reverse=reverse, order_by=order_by, **kwargs)

    @classmethod
    @DB.connection_context()
    def filter_by_id(cls, user_id):
        """Retrieve a user by their ID.

        Args:
            user_id: The unique identifier of the user.

        Returns:
            User object if found, None otherwise.
        """
        try:
            user = cls.model.select().where(cls.model.id == user_id).get()
            return user
        except peewee.DoesNotExist:
            return None

    @classmethod
    @DB.connection_context()
    def query_user(cls, email, password):
        """Authenticate a user with email and password.

        Args:
            email: User's email address.
            password: User's password in plain text.

        Returns:
            User object if authentication successful, None otherwise.
        """
        user = cls.model.select().where((cls.model.email == email),
                                        (cls.model.status == StatusEnum.VALID.value)).first()
        if user:
            # Check if this is a Coze database (Argon2 password)
            if DB.database == 'opencoze':
                try:
                    # Try to verify with argon2
                    import argon2
                    import logging
                    ph = argon2.PasswordHasher()

                    # Debug logging
                    logging.info(f"Attempting login for user: {user.email}")
                    logging.info(f"Password hash length: {len(str(user.password))}")
                    logging.info(f"Input password: '{password}' (length: {len(password)})")

                    ph.verify(str(user.password), password)
                    logging.info(f"✅ Password verification successful for {user.email}")
                    return user
                except Exception as e:
                    # Password verification failed
                    import logging
                    logging.warning(f"❌ Argon2 password verification failed for user {user.email}: {e}")
                    logging.warning(f"Hash: {str(user.password)[:50]}...")
                    return None
            else:
                # RAGFlow's own password format
                if check_password_hash(str(user.password), password):
                    return user
        return None

    @classmethod
    @DB.connection_context()
    def save(cls, **kwargs):
        if "id" not in kwargs:
            kwargs["id"] = get_uuid()
        if "password" in kwargs:
            kwargs["password"] = generate_password_hash(
                str(kwargs["password"]))

        kwargs["create_time"] = current_timestamp()
        kwargs["create_date"] = datetime_format(datetime.now())
        kwargs["update_time"] = current_timestamp()
        kwargs["update_date"] = datetime_format(datetime.now())
        obj = cls.model(**kwargs).save(force_insert=True)
        return obj

    @classmethod
    @DB.connection_context()
    def delete_user(cls, user_ids, update_user_dict):
        with DB.atomic():
            cls.model.update({"status": 0}).where(
                cls.model.id.in_(user_ids)).execute()

    @classmethod
    @DB.connection_context()
    def update_user(cls, user_id, user_dict):
        with DB.atomic():
            if user_dict:
                user_dict["update_time"] = current_timestamp()
                user_dict["update_date"] = datetime_format(datetime.now())
                cls.model.update(user_dict).where(
                    cls.model.id == user_id).execute()

    @classmethod
    @DB.connection_context()
    def is_admin(cls, user_id):
        return cls.model.select().where(
            cls.model.id == user_id,
            cls.model.is_superuser == 1).count() > 0


class TenantService(CommonService):
    """Service class for managing tenant-related database operations.

    This class extends CommonService to provide functionality for tenant management,
    including tenant information retrieval and credit management.

    Attributes:
        model: The Tenant model class for database operations.
    """
    model = Tenant

    @classmethod
    @DB.connection_context()
    def get_info_by(cls, user_id):
        """Get tenant info prioritizing TenantConfig data over view data"""
        # Get basic tenant info from view (for backward compatibility)
        base_fields = [
            cls.model.id.alias("tenant_id"),
            UserTenant.role]
        base_results = list(cls.model.select(*base_fields)
                           .join(UserTenant, on=((cls.model.id == UserTenant.tenant_id) & (UserTenant.user_id == user_id) & (UserTenant.status == StatusEnum.VALID.value) & (UserTenant.role == UserTenantRole.OWNER)))
                           .where(cls.model.status == StatusEnum.VALID.value).dicts())

        # Enhance with TenantConfig data
        for result in base_results:
            tenant_id = result['tenant_id']
            try:
                # Try to get config from TenantConfig table first
                config = TenantConfig.get(TenantConfig.tenant_id == tenant_id)
                result.update({
                    'name': config.name,
                    'llm_id': config.llm_id,
                    'embd_id': config.embd_id,
                    'rerank_id': config.rerank_id,
                    'asr_id': config.asr_id,
                    'img2txt_id': config.img2txt_id,
                    'tts_id': config.tts_id,
                    'parser_ids': config.parser_ids,
                })
                logging.info(f"✅ 使用TenantConfig数据为租户: {tenant_id}")
            except TenantConfig.DoesNotExist:
                # Fallback to view data if config doesn't exist
                view_data = cls.model.get(cls.model.id == tenant_id)
                result.update({
                    'name': view_data.name,
                    'llm_id': view_data.llm_id,
                    'embd_id': view_data.embd_id,
                    'rerank_id': view_data.rerank_id,
                    'asr_id': view_data.asr_id,
                    'img2txt_id': view_data.img2txt_id,
                    'tts_id': view_data.tts_id,
                    'parser_ids': view_data.parser_ids,
                })
                logging.info(f"⚠️  使用视图数据为租户: {tenant_id} (配置表中无数据)")

        return base_results

    @classmethod
    @DB.connection_context()
    def update_by_id(cls, tenant_id, data):
        """Override update_by_id to use TenantConfigService"""
        from api.db.services.user_service import TenantConfigService
        try:
            # Use TenantConfigService for updates
            num_updated = TenantConfigService.update_config(tenant_id, data)
            logging.info(f"✅ 通过TenantConfig更新租户 {tenant_id}: {num_updated} 行受影响")
            return num_updated
        except Exception as e:
            logging.error(f"❌ TenantConfig更新失败: {e}")
            # Fallback to parent method (view update) if TenantConfig fails
            logging.info("⚠️  回退到视图更新方式")
            return super().update_by_id(tenant_id, data)

    @classmethod
    @DB.connection_context()
    def get_joined_tenants_by_user_id(cls, user_id):
        fields = [
            cls.model.id.alias("tenant_id"),
            cls.model.name,
            cls.model.llm_id,
            cls.model.embd_id,
            cls.model.asr_id,
            cls.model.img2txt_id,
            UserTenant.role]
        return list(cls.model.select(*fields)
                    .join(UserTenant, on=((cls.model.id == UserTenant.tenant_id) & (UserTenant.user_id == user_id) & (UserTenant.status == StatusEnum.VALID.value) & (UserTenant.role == UserTenantRole.NORMAL)))
                    .where(cls.model.status == StatusEnum.VALID.value).dicts())

    @classmethod
    @DB.connection_context()
    def decrease(cls, user_id, num):
        num = cls.model.update(credit=cls.model.credit - num).where(
            cls.model.id == user_id).execute()
        if num == 0:
            raise LookupError("Tenant not found which is supposed to be there")

    @classmethod
    @DB.connection_context()
    def user_gateway(cls, tenant_id):
        hashobj = hashlib.sha256(tenant_id.encode("utf-8"))
        return int(hashobj.hexdigest(), 16)%len(MINIO)


class TenantConfigService(CommonService):
    """Service class for managing tenant configuration data.

    This service manages the real tenant config table (ragflow_tenant_config)
    which stores updatable tenant information, avoiding the limitations of views.
    """
    model = TenantConfig

    @classmethod
    @DB.connection_context()
    def get_or_create_config(cls, tenant_id, defaults=None):
        """Get existing config or create with defaults from ragflow_tenant view"""
        try:
            config = cls.model.get(cls.model.tenant_id == tenant_id)
            return config, False  # (config, created)
        except cls.model.DoesNotExist:
            # Create from ragflow_tenant view data if defaults not provided
            if defaults is None:
                from api.db.db_models import Tenant
                try:
                    tenant = Tenant.get(Tenant.id == tenant_id)
                    defaults = {
                        'name': tenant.name,
                        'llm_id': tenant.llm_id,
                        'embd_id': tenant.embd_id,
                        'asr_id': tenant.asr_id,
                        'img2txt_id': tenant.img2txt_id,
                        'rerank_id': tenant.rerank_id,
                        'tts_id': tenant.tts_id,
                        'parser_ids': tenant.parser_ids,
                    }
                    logging.info(f"Creating tenant config from view data: {defaults}")
                except:
                    defaults = {}

            # Create new config
            config_data = {'tenant_id': tenant_id}
            config_data.update(defaults)
            config = cls.insert(**config_data)
            return config, True  # (config, created)

    @classmethod
    @DB.connection_context()
    def update_config(cls, tenant_id, data):
        """Update tenant configuration"""
        try:
            # Ensure the config exists
            config, created = cls.get_or_create_config(tenant_id)
            if created:
                logging.info(f"Created new tenant config for {tenant_id}")

            # Update using proper primary key field (tenant_id instead of id)
            from api.utils import current_timestamp, datetime_format
            from datetime import datetime

            data["update_time"] = current_timestamp()
            data["update_date"] = datetime_format(datetime.now())

            num_updated = cls.model.update(data).where(cls.model.tenant_id == tenant_id).execute()
            logging.info(f"Updated tenant config {tenant_id}: {num_updated} rows affected")
            return num_updated
        except Exception as e:
            logging.error(f"Failed to update tenant config {tenant_id}: {e}")
            raise e


class UserTenantService(CommonService):
    """Service class for managing user-tenant relationship operations.

    This class extends CommonService to handle the many-to-many relationship
    between users and tenants, managing user roles and tenant memberships.

    Attributes:
        model: The UserTenant model class for database operations.
    """
    model = UserTenant

    @classmethod
    @DB.connection_context()
    def filter_by_id(cls, user_tenant_id):
        try:
            user_tenant = cls.model.select().where((cls.model.id == user_tenant_id) & (cls.model.status == StatusEnum.VALID.value)).get()
            return user_tenant
        except peewee.DoesNotExist:
            return None

    @classmethod
    @DB.connection_context()
    def save(cls, **kwargs):
        if "id" not in kwargs:
            kwargs["id"] = get_uuid()
        obj = cls.model(**kwargs).save(force_insert=True)
        return obj

    @classmethod
    @DB.connection_context()
    def get_by_tenant_id(cls, tenant_id):
        fields = [
            cls.model.id,
            cls.model.user_id,
            cls.model.status,
            cls.model.role,
            User.nickname,
            User.email,
            User.avatar,
            User.is_authenticated,
            User.is_active,
            User.is_anonymous,
            User.status,
            User.update_date,
            User.is_superuser]
        return list(cls.model.select(*fields)
                    .join(User, on=((cls.model.user_id == User.id) & (cls.model.status == StatusEnum.VALID.value) & (cls.model.role != UserTenantRole.OWNER)))
                    .where(cls.model.tenant_id == tenant_id)
                    .dicts())

    @classmethod
    @DB.connection_context()
    def get_tenants_by_user_id(cls, user_id):
        fields = [
            cls.model.tenant_id,
            cls.model.role,
            User.nickname,
            User.email,
            User.avatar,
            User.update_date
        ]
        return list(cls.model.select(*fields)
                    .join(User, on=((cls.model.tenant_id == User.id) & (UserTenant.user_id == user_id) & (UserTenant.status == StatusEnum.VALID.value)))
                    .where(cls.model.status == StatusEnum.VALID.value).dicts())

    @classmethod
    @DB.connection_context()
    def get_num_members(cls, user_id: str):
        cnt_members = cls.model.select(peewee.fn.COUNT(cls.model.id)).where(cls.model.tenant_id == user_id).scalar()
        return cnt_members

    @classmethod
    @DB.connection_context()
    def filter_by_tenant_and_user_id(cls, tenant_id, user_id):
        try:
            user_tenant = cls.model.select().where(
                (cls.model.tenant_id == tenant_id) & (cls.model.status == StatusEnum.VALID.value) &
                (cls.model.user_id == user_id)
            ).first()
            return user_tenant
        except peewee.DoesNotExist:
            return None