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
API Token Migration Script

This script handles the migration of API tokens to support the new authentication system:
1. Add token_type field to existing APIToken table
2. Mark existing ynetflow- tokens as 'system' type
3. Create KnowledgebaseAPIToken table
4. Ensure backward compatibility

Usage:
    python -m api.db.migrations.migrate_api_tokens
"""

import logging
from datetime import datetime
from api.db.db_models import DB, APIToken, KnowledgebaseAPIToken
from api.utils import current_timestamp, datetime_format

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def add_token_type_field():
    """Add token_type field to APIToken table if it doesn't exist"""
    try:
        # Check if token_type field already exists
        cursor = DB.execute_sql("DESCRIBE api_token;")
        columns = [row[0] for row in cursor.fetchall()]
        
        if 'token_type' not in columns:
            logger.info("Adding token_type field to api_token table...")
            DB.execute_sql("ALTER TABLE api_token ADD COLUMN token_type VARCHAR(16) DEFAULT 'system';")
            DB.execute_sql("ALTER TABLE api_token ADD INDEX idx_token_type (token_type);")
            logger.info("token_type field added successfully")
        else:
            logger.info("token_type field already exists, skipping...")
            
    except Exception as e:
        logger.error(f"Error adding token_type field: {e}")
        raise


def update_existing_tokens():
    """Update existing tokens to mark them as system type"""
    try:
        logger.info("Updating existing API tokens...")
        
        # Update all existing tokens to 'system' type
        updated_count = DB.execute_sql("""
            UPDATE api_token 
            SET token_type = 'system', 
                update_time = %s,
                update_date = %s
            WHERE token_type IS NULL OR token_type = '';
        """, [current_timestamp(), datetime_format(datetime.now())]).rowcount
        
        logger.info(f"Updated {updated_count} existing tokens to system type")
        
    except Exception as e:
        logger.error(f"Error updating existing tokens: {e}")
        raise


def create_kb_api_token_table():
    """Create KnowledgebaseAPIToken table if it doesn't exist"""
    try:
        # Check if table exists
        cursor = DB.execute_sql("SHOW TABLES LIKE 'kb_api_tokens';")
        if not cursor.fetchone():
            logger.info("Creating kb_api_tokens table...")
            
            create_table_sql = """
            CREATE TABLE kb_api_tokens (
                id VARCHAR(32) PRIMARY KEY,
                kb_id VARCHAR(32) NOT NULL,
                tenant_id VARCHAR(32) NOT NULL,
                token VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255),
                description TEXT,
                permissions JSON DEFAULT ('["read"]'),
                status VARCHAR(16) NOT NULL DEFAULT 'active',
                expires_at DATETIME,
                created_by VARCHAR(32) NOT NULL,
                create_time BIGINT,
                create_date DATETIME,
                update_time BIGINT,
                update_date DATETIME,
                
                INDEX idx_kb_id (kb_id),
                INDEX idx_tenant_id (tenant_id),
                INDEX idx_token (token),
                INDEX idx_kb_token_type (kb_id, status),
                INDEX idx_kb_tenant (kb_id, tenant_id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            """
            
            DB.execute_sql(create_table_sql)
            logger.info("kb_api_tokens table created successfully")
        else:
            logger.info("kb_api_tokens table already exists, skipping...")
            
    except Exception as e:
        logger.error(f"Error creating kb_api_tokens table: {e}")
        raise


def verify_migration():
    """Verify that the migration completed successfully"""
    try:
        logger.info("Verifying migration...")
        
        # Check APIToken table
        cursor = DB.execute_sql("SELECT COUNT(*) FROM api_token WHERE token_type = 'system';")
        system_token_count = cursor.fetchone()[0]
        logger.info(f"Found {system_token_count} system tokens in api_token table")
        
        # Check KnowledgebaseAPIToken table
        cursor = DB.execute_sql("SELECT COUNT(*) FROM kb_api_tokens;")
        kb_token_count = cursor.fetchone()[0]
        logger.info(f"Found {kb_token_count} KB tokens in kb_api_tokens table")
        
        logger.info("Migration verification completed successfully")
        
    except Exception as e:
        logger.error(f"Error during verification: {e}")
        raise


def main():
    """Main migration function"""
    logger.info("Starting API Token migration...")
    
    try:
        with DB.atomic():
            # Step 1: Add token_type field to APIToken table
            add_token_type_field()
            
            # Step 2: Update existing tokens
            update_existing_tokens()
            
            # Step 3: Create KnowledgebaseAPIToken table
            create_kb_api_token_table()
            
            # Step 4: Verify migration
            verify_migration()
            
        logger.info("API Token migration completed successfully!")
        
    except Exception as e:
        logger.error(f"Migration failed: {e}")
        raise


if __name__ == "__main__":
    main()