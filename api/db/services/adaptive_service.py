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

"""
自适应服务层 - 智能选择使用视图或真实表
当视图不支持更新操作时，自动切换到对应的真实表
"""

import logging
from api.db.services.common_service import CommonService
from api.db.services.user_service import UserTenantService
from api.db.db_models import UserTenant, UserTenantReal


class AdaptiveUserTenantService(CommonService):
    """
    自适应的用户-租户关系服务
    读操作使用视图，写操作使用真实表
    """
    model = UserTenant  # 默认使用视图进行查询

    @classmethod
    def get_writable_model(cls):
        """获取可写的模型（真实表）"""
        return UserTenantReal

    @classmethod
    def create_or_update_relation(cls, user_id, tenant_id, role="owner", **kwargs):
        """
        创建或更新用户-租户关系
        优先在真实表中操作，确保数据持久化
        """
        try:
            from api.utils import get_uuid

            # 检查是否已存在关系（在视图中查询）
            existing = cls.model.get_or_none(
                (cls.model.user_id == user_id) &
                (cls.model.tenant_id == tenant_id)
            )

            if existing:
                # 更新现有关系（使用真实表）
                writable_model = cls.get_writable_model()
                update_data = {"role": role, **kwargs}
                result = writable_model.update(update_data).where(
                    (writable_model.user_id == user_id) &
                    (writable_model.tenant_id == tenant_id)
                ).execute()
                logging.info(f"✅ 更新用户-租户关系: {user_id} -> {tenant_id}, 影响行数: {result}")
                return result
            else:
                # 创建新关系（使用真实表）
                writable_model = cls.get_writable_model()
                relation_data = {
                    "id": get_uuid(),
                    "user_id": user_id,
                    "tenant_id": tenant_id,
                    "role": role,
                    "status": "1",
                    **kwargs
                }
                new_relation = writable_model.create(**relation_data)
                logging.info(f"✅ 创建用户-租户关系: {user_id} -> {tenant_id}")
                return new_relation

        except Exception as e:
            logging.error(f"❌ 创建/更新用户-租户关系失败: {e}")
            raise e

    @classmethod
    def sync_from_view_to_real_table(cls):
        """
        将视图中的数据同步到真实表（一次性迁移工具）
        """
        try:
            # 从视图获取所有数据
            view_records = list(cls.model.select())
            writable_model = cls.get_writable_model()

            # 清空真实表（可选）
            # writable_model.delete().execute()

            synced_count = 0
            for record in view_records:
                # 检查真实表中是否已存在
                existing = writable_model.get_or_none(writable_model.id == record.id)
                if not existing:
                    # 创建到真实表
                    writable_model.create(
                        id=record.id,
                        user_id=record.user_id,
                        tenant_id=record.tenant_id,
                        role=record.role,
                        invited_by=getattr(record, 'invited_by', None),
                        status=record.status,
                        create_time=getattr(record, 'create_time', None),
                        create_date=getattr(record, 'create_date', None),
                        update_time=getattr(record, 'update_time', None),
                        update_date=getattr(record, 'update_date', None),
                    )
                    synced_count += 1

            logging.info(f"✅ 同步完成: {synced_count} 条记录从视图同步到真实表")
            return synced_count

        except Exception as e:
            logging.error(f"❌ 视图到真实表同步失败: {e}")
            raise e


# 为了向后兼容，可以替换原有的UserTenantService
class EnhancedUserTenantService(UserTenantService):
    """
    增强版用户-租户服务，继承原有功能并添加自适应能力
    """

    @classmethod
    def create_user_tenant_relation(cls, user_id, tenant_id, role="owner"):
        """创建用户-租户关系的便捷方法"""
        return AdaptiveUserTenantService.create_or_update_relation(
            user_id=user_id,
            tenant_id=tenant_id,
            role=role
        )