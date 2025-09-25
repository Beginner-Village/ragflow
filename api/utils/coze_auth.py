"""
跨系统用户认证工具
用于解析Coze session_key并映射到RAGFlow用户
"""

import base64
import json
import logging
import hashlib
from typing import Optional, Dict, Any
from api.db.services.user_service import UserService
from api.db import StatusEnum


class CozeAuthHelper:
    """Coze认证辅助类"""

    @staticmethod
    def parse_session_key(session_key: str) -> Optional[Dict[str, Any]]:
        """
        解析Coze的session_key获取用户信息

        Args:
            session_key: Coze的session token

        Returns:
            用户信息字典，包含id、created_at、expires_at等
        """
        if not session_key or not session_key.startswith('eyJ'):
            return None

        try:
            # Coze session_key格式: base64_json@signature
            logging.info(f"开始解析session_key: 长度={len(session_key)}, 前50字符={session_key[:50]}")

            # 首先分离@符号
            if '@' in session_key:
                base64_part = session_key.split('@')[0]
                logging.info(f"发现@分隔符，提取base64部分: 长度={len(base64_part)}")
            else:
                # 如果没有@符号，可能是其他分隔符或整个就是base64
                base64_part = session_key
                logging.info(f"未发现@分隔符，使用整个token: 长度={len(base64_part)}")

            # 检查base64字符的有效性
            valid_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            invalid_chars = [c for c in base64_part if c not in valid_chars]
            if invalid_chars:
                logging.warning(f"发现无效字符: {invalid_chars}")
                return None

            # 确保base64长度是4的倍数
            remainder = len(base64_part) % 4
            if remainder:
                padding = '=' * (4 - remainder)
                base64_part += padding
                logging.info(f"添加padding {padding}: 最终长度={len(base64_part)}")

            logging.info(f"准备解析base64部分: {base64_part[:30]}...")

            # Base64解码（不使用validate参数，避免严格验证）
            decoded_bytes = base64.b64decode(base64_part)
            decoded_str = decoded_bytes.decode('utf-8')

            logging.info(f"解码成功: {decoded_str}")

            # 解析JSON
            user_info = json.loads(decoded_str)
            logging.info(f"✅ 成功解析session_key: user_id={user_info.get('id')}")
            return user_info

        except Exception as e:
            logging.warning(f"解析session_key失败: {e}")
            import traceback
            logging.warning(f"详细错误: {traceback.format_exc()}")

        return None

    @staticmethod
    def get_user_by_coze_id(coze_user_id: str) -> Optional[Any]:
        """
        通过Coze用户ID查找RAGFlow用户

        Args:
            coze_user_id: Coze系统的用户ID

        Returns:
            RAGFlow用户对象或None
        """
        try:
            # 方法1: 使用MD5哈希作为RAGFlow用户ID（基于数据迁移逻辑）
            ragflow_user_id = hashlib.md5(str(coze_user_id).encode()).hexdigest()
            users = UserService.query(id=ragflow_user_id, status=StatusEnum.VALID.value)
            if users:
                logging.info(f"✅ 通过ID映射找到用户: coze_id={coze_user_id} -> ragflow_id={ragflow_user_id}")
                return users[0]

            # 方法2: 如果ID映射失败，尝试从session中的user_id直接查找数据库中相似的用户
            # 这可能是因为session中的ID和实际数据库ID有细微差别
            logging.info(f"ID映射失败，尝试其他方式查找用户: coze_id={coze_user_id}")

            # 尝试通过邮箱映射（从Coze数据库查找）
            user = CozeAuthHelper.get_user_by_email_from_coze(coze_user_id)
            if user:
                return user

        except Exception as e:
            logging.warning(f"通过ID映射查找用户失败: {e}")

        return None

    @staticmethod
    def get_user_by_session_key_direct(session_key: str) -> Optional[Any]:
        """
        直接通过session_key在Coze数据库中查找用户

        Args:
            session_key: 完整的session_key值

        Returns:
            RAGFlow用户对象或None
        """
        try:
            from api.db.db_models import DB

            # 在Coze数据库中通过session_key查找用户（使用原始SQL）
            cursor = DB.execute_sql(
                "SELECT id, email, name FROM user WHERE session_key = %s AND deleted_at IS NULL",
                (session_key,)
            )
            result = cursor.fetchone()
            coze_user = None

            if result:
                # 创建一个简单的用户对象
                class SimpleCozeUser:
                    def __init__(self, id, email, name):
                        self.id = id
                        self.email = email
                        self.name = name

                coze_user = SimpleCozeUser(result[0], result[1], result[2])

            if coze_user:
                logging.info(f"✅ 通过session_key直接找到Coze用户: id={coze_user.id}, email={coze_user.email}")

                # 直接使用Coze用户信息创建User对象
                from api.db.db_models import User

                user_data = {
                    'id': hashlib.md5(str(coze_user.id).encode()).hexdigest(),  # 使用MD5映射ID
                    'email': coze_user.email,
                    'nickname': coze_user.name or coze_user.email.split('@')[0],
                    'status': StatusEnum.VALID.value,
                    'is_authenticated': '1',
                    'is_active': '1',
                    'is_anonymous': '0',
                }

                temp_user = User(**user_data)
                logging.info(f"✅ 通过session_key直接创建用户对象: {coze_user.email}")
                return temp_user
            else:
                logging.info(f"未通过session_key直接查找到用户")

        except Exception as e:
            logging.error(f"通过session_key直接查找用户失败: {e}")

        return None

    @staticmethod
    def get_user_by_email_from_coze(coze_user_id: str) -> Optional[Any]:
        """
        通过Coze用户ID从Coze数据库查询邮箱，再在RAGFlow中查找用户
        如果直接ID查找失败，尝试模糊匹配相似的ID

        Args:
            coze_user_id: Coze系统的用户ID

        Returns:
            RAGFlow用户对象或None
        """
        try:
            from api.db.db_models import DB

            # 方法1: 直接通过ID查找（使用原始SQL）
            logging.info(f"尝试直接ID查找: {coze_user_id}")
            cursor = DB.execute_sql(
                "SELECT id, email, name FROM user WHERE id = %s AND deleted_at IS NULL",
                (coze_user_id,)
            )
            result = cursor.fetchone()
            logging.info(f"直接ID查找结果: {result}")

            coze_user = None
            if result:
                class SimpleCozeUser:
                    def __init__(self, id, email, name):
                        self.id = id
                        self.email = email
                        self.name = name
                coze_user = SimpleCozeUser(result[0], result[1], result[2])

            if coze_user:
                email = coze_user.email
                logging.info(f"✅ 直接ID匹配成功: coze_id={coze_user_id} -> email={email}")
            else:
                # 方法2: 如果直接ID查找失败，尝试查找相似的ID（前缀匹配）
                coze_id_prefix = str(coze_user_id)[:10]  # 取前10位作为前缀
                logging.info(f"尝试前缀匹配: {coze_id_prefix}")

                # 使用LIKE查询，需要原始SQL
                from api.db.db_models import DB
                cursor = DB.execute_sql(
                    "SELECT id, email FROM user WHERE CAST(id AS CHAR) LIKE %s AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 5",
                    (f"{coze_id_prefix}%",)
                )
                results = cursor.fetchall()
                logging.info(f"前缀匹配查询结果: {len(results)} 条记录")

                if results:
                    # 取最新的用户记录
                    user_id, email = results[0]
                    logging.info(f"✅ 前缀匹配成功: coze_id={coze_user_id} -> 实际ID={user_id} -> email={email}")
                else:
                    logging.warning(f"Coze数据库中未找到ID {coze_user_id} 或相似ID的用户")
                    return None

            # 直接返回从user表找到的用户，构造为User对象
            from api.db.services.user_service import UserService
            from api.db.db_models import User

            # 创建一个User对象，使用Coze数据库中的用户信息
            # 需要映射字段名：Coze -> RAGFlow
            user_data = {
                'id': hashlib.md5(str(coze_user_id).encode()).hexdigest(),  # 使用MD5映射ID
                'email': email,
                'nickname': result[0] if len(result) > 2 else email,  # 使用name或email作为nickname
                'status': StatusEnum.VALID.value,
                'is_authenticated': True,
                'is_active': True,
                'is_anonymous': False,
            }

            # 创建临时User对象用于认证
            temp_user = User(**user_data)
            logging.info(f"✅ 创建临时用户对象用于认证: {email}")
            return temp_user

        except Exception as e:
            logging.error(f"通过邮箱查找用户失败: {e}")

        return None

    @staticmethod
    def authenticate_user(session_key: str) -> Optional[Any]:
        """
        跨系统用户认证主入口

        直接通过session_key在Coze数据库中查找用户，无需解析

        Args:
            session_key: Coze的session token

        Returns:
            认证成功的RAGFlow用户对象或None
        """
        if not session_key:
            return None

        try:
            from api.db.db_models import DB, User

            # 直接在Coze数据库中通过session_key查找用户
            cursor = DB.execute_sql(
                "SELECT id, email, name FROM user WHERE session_key = %s AND deleted_at IS NULL",
                (session_key,)
            )
            result = cursor.fetchone()

            if result:
                coze_user_id, email, name = result
                logging.info(f"✅ 通过session_key找到Coze用户: id={coze_user_id}, email={email}")

                # 直接创建RAGFlow用户对象
                import hashlib
                from api.db import StatusEnum

                user_data = {
                    'id': hashlib.md5(str(coze_user_id).encode()).hexdigest(),  # 使用MD5映射ID
                    'email': email,
                    'nickname': name or email.split('@')[0],
                    'status': StatusEnum.VALID.value,
                    'is_authenticated': '1',
                    'is_active': '1',
                    'is_anonymous': '0',
                }

                temp_user = User(**user_data)
                logging.info(f"✅ 跨系统认证成功: {email}")
                return temp_user
            else:
                logging.info(f"未通过session_key找到用户")
                return None

        except Exception as e:
            logging.error(f"跨系统认证失败: {e}")
            return None