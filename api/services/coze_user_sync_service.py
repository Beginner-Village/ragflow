"""
Coze-Studio 用户数据同步服务
实现从Coze-Studio同步用户数据到RAGFlow本地数据库
"""

import hashlib
import logging
import time
from datetime import datetime, timedelta
from typing import Optional, List, Dict, Any
import pymysql
from pymysql.cursors import DictCursor

from api.utils import get_uuid
from api.settings import DATABASE as RAGFLOW_DB
from api.db import StatusEnum


class CozeUserSyncService:
    """
    用户同步服务，负责从Coze-Studio同步用户数据
    """

    def __init__(self):
        # Coze-Studio数据库配置
        self.coze_db_config = {
            'host': '10.10.10.220',
            'port': 3306,
            'user': 'coze',
            'password': 'coze123',
            'database': 'opencoze',
            'charset': 'utf8mb4',
            'cursorclass': DictCursor
        }

        # RAGFlow数据库配置
        self.ragflow_db_config = {
            'host': RAGFLOW_DB.get('host', '10.10.10.223'),
            'port': RAGFLOW_DB.get('port', 5455),
            'user': RAGFLOW_DB.get('user', 'root'),
            'password': RAGFLOW_DB.get('password', 'infini_rag_flow'),
            'database': RAGFLOW_DB.get('name', 'rag_flow'),
            'charset': 'utf8mb4',
            'cursorclass': DictCursor
        }

        self.logger = logging.getLogger(__name__)

    def _get_coze_connection(self):
        """获取Coze-Studio数据库连接"""
        return pymysql.connect(**self.coze_db_config)

    def _get_ragflow_connection(self):
        """获取RAGFlow数据库连接"""
        return pymysql.connect(**self.ragflow_db_config)

    def _generate_user_id(self, coze_user_id: int) -> str:
        """生成RAGFlow格式的用户ID"""
        return hashlib.md5(str(coze_user_id).encode()).hexdigest()

    def _generate_access_token(self, user_id: str) -> str:
        """为用户生成RAGFlow访问令牌"""
        return f"YnetFlow-{get_uuid()[:24]}"

    def sync_user_by_session_key(self, session_key: str) -> Optional[Dict[str, Any]]:
        """
        根据session_key同步单个用户
        这是最常用的同步方法，当用户登录时调用
        """
        try:
            # 1. 首先检查session映射表
            with self._get_ragflow_connection() as ragflow_conn:
                with ragflow_conn.cursor() as cursor:
                    # 检查是否已有映射
                    cursor.execute("""
                        SELECT user_id, ragflow_token, coze_user_id, expires_at
                        FROM coze_session_map
                        WHERE coze_session_key = %s AND is_active = 1
                    """, (session_key,))
                    session_map = cursor.fetchone()

                    # 如果有有效的映射，直接返回
                    if session_map and (not session_map['expires_at'] or session_map['expires_at'] > datetime.now()):
                        # 更新最后访问时间
                        cursor.execute("""
                            UPDATE coze_session_map
                            SET last_accessed = NOW()
                            WHERE coze_session_key = %s
                        """, (session_key,))
                        ragflow_conn.commit()

                        # 获取用户信息
                        cursor.execute("""
                            SELECT * FROM coze_user_sync
                            WHERE id = %s
                        """, (session_map['user_id'],))
                        return cursor.fetchone()

            # 2. 从Coze-Studio查询用户信息
            with self._get_coze_connection() as coze_conn:
                with coze_conn.cursor() as cursor:
                    cursor.execute("""
                        SELECT id, name, email, password, icon_uri, locale,
                               user_verified, session_key, created_at, updated_at
                        FROM user
                        WHERE session_key = %s AND deleted_at IS NULL
                    """, (session_key,))
                    coze_user = cursor.fetchone()

                    if not coze_user:
                        self.logger.warning(f"No user found with session_key: {session_key[:8]}...")
                        return None

            # 3. 同步用户到RAGFlow数据库
            return self._sync_single_user(coze_user)

        except Exception as e:
            self.logger.error(f"Failed to sync user by session_key: {e}")
            return None

    def _sync_single_user(self, coze_user: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        同步单个用户数据到RAGFlow数据库
        """
        try:
            with self._get_ragflow_connection() as conn:
                with conn.cursor() as cursor:
                    user_id = self._generate_user_id(coze_user['id'])
                    tenant_id = user_id  # 简化：每个用户一个租户

                    # 检查用户是否已存在
                    cursor.execute("""
                        SELECT id, access_token FROM coze_user_sync
                        WHERE coze_user_id = %s
                    """, (coze_user['id'],))
                    existing_user = cursor.fetchone()

                    if existing_user:
                        # 更新现有用户
                        cursor.execute("""
                            UPDATE coze_user_sync SET
                                coze_session_key = %s,
                                email = %s,
                                nickname = %s,
                                password_hash = %s,
                                avatar_url = %s,
                                locale = %s,
                                user_verified = %s,
                                update_time = %s,
                                last_sync_time = NOW(),
                                sync_status = 'active'
                            WHERE coze_user_id = %s
                        """, (
                            coze_user['session_key'],
                            coze_user['email'],
                            coze_user['name'],
                            coze_user['password'],
                            coze_user.get('icon_uri'),
                            coze_user.get('locale'),
                            coze_user.get('user_verified', False),
                            coze_user.get('updated_at'),
                            coze_user['id']
                        ))
                        access_token = existing_user['access_token']
                    else:
                        # 创建新用户
                        access_token = self._generate_access_token(user_id)
                        cursor.execute("""
                            INSERT INTO coze_user_sync (
                                id, coze_user_id, coze_session_key, email, nickname,
                                password_hash, avatar_url, locale, user_verified,
                                tenant_id, access_token, language, create_time, update_time
                            ) VALUES (
                                %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                            )
                        """, (
                            user_id, coze_user['id'], coze_user['session_key'],
                            coze_user['email'], coze_user['name'],
                            coze_user['password'], coze_user.get('icon_uri'),
                            coze_user.get('locale'), coze_user.get('user_verified', False),
                            tenant_id, access_token,
                            'Chinese' if 'zh' in str(coze_user.get('locale', '')) else 'English',
                            coze_user.get('created_at'), coze_user.get('updated_at')
                        ))

                    # 更新session映射
                    cursor.execute("""
                        INSERT INTO coze_session_map (
                            coze_session_key, ragflow_token, user_id, coze_user_id,
                            expires_at
                        ) VALUES (%s, %s, %s, %s, %s)
                        ON DUPLICATE KEY UPDATE
                            ragflow_token = VALUES(ragflow_token),
                            last_accessed = NOW(),
                            is_active = 1
                    """, (
                        coze_user['session_key'], access_token, user_id, coze_user['id'],
                        datetime.now() + timedelta(days=7)  # 7天有效期
                    ))

                    conn.commit()

                    # 返回同步后的用户信息
                    cursor.execute("""
                        SELECT * FROM coze_user_sync
                        WHERE id = %s
                    """, (user_id,))
                    return cursor.fetchone()

        except Exception as e:
            self.logger.error(f"Failed to sync single user: {e}")
            return None

    def validate_session_key(self, session_key: str) -> bool:
        """
        验证session_key是否有效
        """
        try:
            # 方法1：检查本地缓存
            with self._get_ragflow_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute("""
                        SELECT expires_at, is_active
                        FROM coze_session_map
                        WHERE coze_session_key = %s
                    """, (session_key,))
                    result = cursor.fetchone()

                    if result and result['is_active']:
                        if not result['expires_at'] or result['expires_at'] > datetime.now():
                            return True

            # 方法2：向Coze-Studio验证
            with self._get_coze_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute("""
                        SELECT id FROM user
                        WHERE session_key = %s AND deleted_at IS NULL
                    """, (session_key,))
                    return cursor.fetchone() is not None

        except Exception as e:
            self.logger.error(f"Failed to validate session key: {e}")
            return False

    def sync_all_users(self, limit: int = 100) -> Dict[str, Any]:
        """
        批量同步用户（用于初始化或定期同步）
        """
        sync_result = {
            'success': 0,
            'failed': 0,
            'errors': []
        }

        try:
            # 记录同步日志
            with self._get_ragflow_connection() as ragflow_conn:
                with ragflow_conn.cursor() as cursor:
                    cursor.execute("""
                        INSERT INTO user_sync_log (sync_type, sync_status, started_at)
                        VALUES ('full', 'running', NOW())
                    """)
                    sync_log_id = cursor.lastrowid
                    ragflow_conn.commit()

            # 从Coze-Studio获取用户列表
            with self._get_coze_connection() as coze_conn:
                with coze_conn.cursor() as cursor:
                    cursor.execute("""
                        SELECT id, name, email, password, icon_uri, locale,
                               user_verified, session_key, created_at, updated_at
                        FROM user
                        WHERE deleted_at IS NULL
                        ORDER BY updated_at DESC
                        LIMIT %s
                    """, (limit,))
                    users = cursor.fetchall()

            # 同步每个用户
            for user in users:
                try:
                    result = self._sync_single_user(user)
                    if result:
                        sync_result['success'] += 1
                    else:
                        sync_result['failed'] += 1
                except Exception as e:
                    sync_result['failed'] += 1
                    sync_result['errors'].append(str(e))

            # 更新同步日志
            with self._get_ragflow_connection() as ragflow_conn:
                with ragflow_conn.cursor() as cursor:
                    cursor.execute("""
                        UPDATE user_sync_log SET
                            sync_status = %s,
                            users_synced = %s,
                            errors = %s,
                            completed_at = NOW()
                        WHERE id = %s
                    """, (
                        'success' if sync_result['failed'] == 0 else 'partial',
                        sync_result['success'],
                        '\n'.join(sync_result['errors'][:10]),  # 只保存前10个错误
                        sync_log_id
                    ))
                    ragflow_conn.commit()

        except Exception as e:
            self.logger.error(f"Failed to sync all users: {e}")
            sync_result['errors'].append(str(e))

        return sync_result

    def get_user_by_ragflow_token(self, token: str) -> Optional[Dict[str, Any]]:
        """
        通过RAGFlow token获取用户信息
        """
        try:
            with self._get_ragflow_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute("""
                        SELECT * FROM coze_user_sync
                        WHERE access_token = %s AND sync_status = 'active'
                    """, (token,))
                    return cursor.fetchone()
        except Exception as e:
            self.logger.error(f"Failed to get user by token: {e}")
            return None

    def invalidate_session(self, session_key: str) -> bool:
        """
        使session失效（用于登出）
        """
        try:
            with self._get_ragflow_connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute("""
                        UPDATE coze_session_map
                        SET is_active = 0
                        WHERE coze_session_key = %s
                    """, (session_key,))
                    conn.commit()
                    return True
        except Exception as e:
            self.logger.error(f"Failed to invalidate session: {e}")
            return False


# 单例模式
_sync_service = None


def get_sync_service() -> CozeUserSyncService:
    """获取同步服务单例"""
    global _sync_service
    if _sync_service is None:
        _sync_service = CozeUserSyncService()
    return _sync_service