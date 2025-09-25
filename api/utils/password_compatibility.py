"""
密码验证兼容层
处理RAGFlow和Coze-Studio的密码加密算法差异
"""

import hashlib
import bcrypt
from werkzeug.security import generate_password_hash, check_password_hash


class PasswordCompatibility:
    """
    统一的密码验证类，支持多种加密算法
    """

    @staticmethod
    def verify_password(plain_password, hashed_password):
        """
        验证密码，支持多种加密格式

        Args:
            plain_password: 明文密码
            hashed_password: 加密后的密码

        Returns:
            bool: 密码是否匹配
        """
        if not plain_password or not hashed_password:
            return False

        # 1. 尝试werkzeug格式（RAGFlow默认）
        if hashed_password.startswith('pbkdf2:') or hashed_password.startswith('scrypt:'):
            try:
                return check_password_hash(hashed_password, plain_password)
            except:
                pass

        # 2. 尝试bcrypt格式（可能是coze-studio使用的）
        if hashed_password.startswith('$2b$') or hashed_password.startswith('$2a$'):
            try:
                return bcrypt.checkpw(
                    plain_password.encode('utf-8'),
                    hashed_password.encode('utf-8')
                )
            except:
                pass

        # 3. 尝试简单的SHA256（某些系统可能使用）
        try:
            sha256_hash = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
            if sha256_hash == hashed_password:
                return True
        except:
            pass

        # 4. 尝试MD5（不推荐，但某些旧系统可能使用）
        try:
            md5_hash = hashlib.md5(plain_password.encode('utf-8')).hexdigest()
            if md5_hash == hashed_password:
                return True
        except:
            pass

        return False

    @staticmethod
    def generate_unified_password(plain_password):
        """
        生成统一格式的密码哈希
        使用werkzeug的pbkdf2格式，两个系统都能支持

        Args:
            plain_password: 明文密码

        Returns:
            str: 加密后的密码
        """
        return generate_password_hash(plain_password)

    @staticmethod
    def migrate_password_format(user_id, old_hash, plain_password=None):
        """
        迁移密码格式到统一标准

        Args:
            user_id: 用户ID
            old_hash: 旧的密码哈希
            plain_password: 如果提供，将生成新的哈希

        Returns:
            str: 新的密码哈希或原哈希
        """
        if plain_password:
            # 如果提供了明文密码，生成新的统一格式哈希
            return PasswordCompatibility.generate_unified_password(plain_password)

        # 否则返回原哈希（需要等用户下次登录时迁移）
        return old_hash


# 修改UserService的密码验证方法
def patch_user_service():
    """
    为UserService打补丁，使用兼容的密码验证
    """
    from api.db.services.user_service import UserService

    original_query_user = UserService.query_user

    @classmethod
    def query_user_with_compatibility(cls, email, password):
        """
        使用兼容层验证用户密码
        """
        from api.db import StatusEnum

        user = cls.model.select().where(
            (cls.model.email == email),
            (cls.model.status == StatusEnum.VALID.value)
        ).first()

        if user:
            # 使用兼容层验证密码
            if PasswordCompatibility.verify_password(password, str(user.password)):
                # 可选：如果密码格式旧，迁移到新格式
                # if not user.password.startswith('pbkdf2:'):
                #     new_hash = PasswordCompatibility.generate_unified_password(password)
                #     user.password = new_hash
                #     user.save()
                return user

        return None

    # 替换原方法
    UserService.query_user = query_user_with_compatibility