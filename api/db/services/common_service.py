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
import logging

import peewee

from api.db.db_models import DB
from api.utils import current_timestamp, datetime_format, get_uuid


class CommonService:
    """Base service class that provides common database operations.

    This class serves as a foundation for all service classes in the application,
    implementing standard CRUD operations and common database query patterns.
    It uses the Peewee ORM for database interactions and provides a consistent
    interface for database operations across all derived service classes.

    Attributes:
        model: The Peewee model class that this service operates on. Must be set by subclasses.
    """

    model = None

    @classmethod
    @DB.connection_context()
    def query(cls, cols=None, reverse=None, order_by=None, **kwargs):
        """Execute a database query with optional column selection and ordering.

        This method provides a flexible way to query the database with various filters
        and sorting options. It supports column selection, sort order control, and
        additional filter conditions.

        Args:
            cols (list, optional): List of column names to select. If None, selects all columns.
            reverse (bool, optional): If True, sorts in descending order. If False, sorts in ascending order.
            order_by (str, optional): Column name to sort results by.
            **kwargs: Additional filter conditions passed as keyword arguments.

        Returns:
            peewee.ModelSelect: A query result containing matching records.
        """
        return cls.model.query(cols=cols, reverse=reverse, order_by=order_by, **kwargs)

    @classmethod
    @DB.connection_context()
    def get_all(cls, cols=None, reverse=None, order_by=None):
        """Retrieve all records from the database with optional column selection and ordering.

        This method fetches all records from the model's table with support for
        column selection and result ordering. If no order_by is specified and reverse
        is True, it defaults to ordering by create_time.

        Args:
            cols (list, optional): List of column names to select. If None, selects all columns.
            reverse (bool, optional): If True, sorts in descending order. If False, sorts in ascending order.
            order_by (str, optional): Column name to sort results by. Defaults to 'create_time' if reverse is specified.

        Returns:
            peewee.ModelSelect: A query containing all matching records.
        """
        if cols:
            query_records = cls.model.select(*cols)
        else:
            query_records = cls.model.select()
        if reverse is not None:
            if not order_by or not hasattr(cls, order_by):
                order_by = "create_time"
            if reverse is True:
                query_records = query_records.order_by(cls.model.getter_by(order_by).desc())
            elif reverse is False:
                query_records = query_records.order_by(cls.model.getter_by(order_by).asc())
        return query_records

    @classmethod
    @DB.connection_context()
    def get(cls, **kwargs):
        """Get a single record matching the given criteria.

        This method retrieves a single record from the database that matches
        the specified filter conditions.

        Args:
            **kwargs: Filter conditions as keyword arguments.

        Returns:
            Model instance: Single matching record.

        Raises:
            peewee.DoesNotExist: If no matching record is found.
        """
        return cls.model.get(**kwargs)

    @classmethod
    @DB.connection_context()
    def get_or_none(cls, **kwargs):
        """Get a single record or None if not found.

        This method attempts to retrieve a single record matching the given criteria,
        returning None if no match is found instead of raising an exception.

        Args:
            **kwargs: Filter conditions as keyword arguments.

        Returns:
            Model instance or None: Matching record if found, None otherwise.
        """
        try:
            return cls.model.get(**kwargs)
        except peewee.DoesNotExist:
            return None

    @classmethod
    @DB.connection_context()
    def save(cls, **kwargs):
        """Save a new record to database.

        This method creates a new record in the database with the provided field values,
        forcing an insert operation rather than an update.

        Args:
            **kwargs: Record field values as keyword arguments.

        Returns:
            Model instance: The created record object.
        """
        sample_obj = cls.model(**kwargs).save(force_insert=True)
        return sample_obj

    @classmethod
    @DB.connection_context()
    def insert(cls, **kwargs):
        """Insert a new record with automatic ID and timestamps.

        This method creates a new record with automatically generated ID and timestamp fields.
        It handles the creation of create_time, create_date, update_time, and update_date fields.

        Args:
            **kwargs: Record field values as keyword arguments.

        Returns:
            Model instance: The newly created record object.
        """
        if "id" not in kwargs:
            kwargs["id"] = get_uuid()
        kwargs["create_time"] = current_timestamp()
        kwargs["create_date"] = datetime_format(datetime.now())
        kwargs["update_time"] = current_timestamp()
        kwargs["update_date"] = datetime_format(datetime.now())
        sample_obj = cls.model(**kwargs).save(force_insert=True)
        return sample_obj

    @classmethod
    @DB.connection_context()
    def insert_many(cls, data_list, batch_size=100):
        """Insert multiple records in batches.

        This method efficiently inserts multiple records into the database using batch processing.
        It automatically sets creation timestamps for all records.

        Args:
            data_list (list): List of dictionaries containing record data to insert.
            batch_size (int, optional): Number of records to insert in each batch. Defaults to 100.
        """
        with DB.atomic():
            for d in data_list:
                d["create_time"] = current_timestamp()
                d["create_date"] = datetime_format(datetime.now())
            for i in range(0, len(data_list), batch_size):
                cls.model.insert_many(data_list[i : i + batch_size]).execute()

    @classmethod
    @DB.connection_context()
    def update_many_by_id(cls, data_list):
        """Update multiple records by their IDs.

        This method updates multiple records in the database, identified by their IDs.
        It uses the same view-safe logic as update_by_id for each record.

        Args:
            data_list (list): List of dictionaries containing record data to update.
                             Each dictionary must include an 'id' field.
        """
        with DB.atomic():
            for data in data_list:
                record_id = data.pop("id")  # Remove ID from update data
                cls.update_by_id(record_id, data)

    @classmethod
    @DB.connection_context()
    def update_by_id(cls, pid, data):
        # Update a single record by ID
        # Args:
        #     pid: Record ID
        #     data: Updated field values
        # Returns:
        #     Number of records updated

        # 检查是否是视图，如果是则预先过滤字段
        model_name = cls.model.__name__ if hasattr(cls.model, '__name__') else str(cls.model)
        table_name = getattr(cls.model._meta, 'table_name', '')

        # 判断是否为视图（特定的视图表名）
        # 注意：现在只有ragflow_tenant视图需要特殊处理，其他都有对应的真实表
        view_tables = {'ragflow_tenant', 'ragflow_user_tenant', 'ragflow_dialog', 'ragflow_task'}
        is_view = table_name in view_tables

        if is_view:
            # 为视图使用白名单策略，提前过滤字段
            logging.info(f"检测到视图表 {table_name}，使用白名单更新策略")

            # 定义可更新字段白名单
            updatable_fields = set()

            if 'Tenant' in model_name or 'ragflow_tenant' in table_name:
                # ragflow_tenant视图可更新字段
                updatable_fields = {'name', 'public_key', 'create_time', 'update_time'}
            elif 'User' in model_name or 'ragflow_user' in table_name:
                # ragflow_user视图可更新字段
                updatable_fields = {
                    'access_token', 'nickname', 'password', 'email', 'avatar',
                    'create_time', 'update_time'
                }
            else:
                # 其他视图的可更新字段
                updatable_fields = {'name', 'description', 'create_time', 'update_time'}

            # 只保留白名单中的字段，并添加update_time
            safe_data = {k: v for k, v in data.items() if k in updatable_fields}
            if 'update_time' in updatable_fields:
                safe_data["update_time"] = current_timestamp()

            if safe_data:
                logging.info(f"视图更新字段: {list(safe_data.keys())}")
                logging.info(f"safe_data内容: {safe_data}")

                # 额外检查：确保 update_date 不在 safe_data 中
                if 'update_date' in safe_data:
                    logging.error("ERROR: update_date 在 safe_data 中！这不应该发生")
                    safe_data.pop('update_date', None)

                try:
                    result = cls.model.update(safe_data).where(cls.model.id == pid).execute()
                    logging.info(f"视图更新成功，影响行数: {result}")
                    return result
                except Exception as update_error:
                    logging.error(f"视图更新失败: {update_error}")
                    logging.error(f"尝试更新的数据: {safe_data}")
                    raise update_error
            else:
                logging.info(f"没有可更新的字段，跳过更新。原始字段: {list(data.keys())}")
                return 0
        else:
            # 非视图表，使用原来的逻辑
            try:
                data["update_time"] = current_timestamp()
                data["update_date"] = datetime_format(datetime.now())
                num = cls.model.update(data).where(cls.model.id == pid).execute()
                return num
            except Exception as e:
                # 如果仍然遇到更新错误，记录并重新抛出
                logging.error(f"非视图表更新失败: {e}")
                raise e

    @classmethod
    @DB.connection_context()
    def get_by_id(cls, pid):
        # Get a record by ID
        # Args:
        #     pid: Record ID
        # Returns:
        #     Tuple of (success, record)
        try:
            obj = cls.model.get_or_none(cls.model.id == pid)
            if obj:
                return True, obj
        except Exception:
            pass
        return False, None

    @classmethod
    @DB.connection_context()
    def get_by_ids(cls, pids, cols=None):
        # Get multiple records by their IDs
        # Args:
        #     pids: List of record IDs
        #     cols: List of columns to select
        # Returns:
        #     Query of matching records
        if cols:
            objs = cls.model.select(*cols)
        else:
            objs = cls.model.select()
        return objs.where(cls.model.id.in_(pids))

    @classmethod
    @DB.connection_context()
    def delete_by_id(cls, pid):
        # Delete a record by ID
        # Args:
        #     pid: Record ID
        # Returns:
        #     Number of records deleted
        return cls.model.delete().where(cls.model.id == pid).execute()
    
    @classmethod
    @DB.connection_context()
    def delete_by_ids(cls, pids):
        # Delete multiple records by their IDs
        # Args:
        #     pids: List of record IDs
        # Returns:
        #     Number of records deleted
        with DB.atomic():
            res = cls.model.delete().where(cls.model.id.in_(pids)).execute()
            return res

    @classmethod
    @DB.connection_context()
    def filter_delete(cls, filters):
        # Delete records matching given filters
        # Args:
        #     filters: List of filter conditions
        # Returns:
        #     Number of records deleted
        with DB.atomic():
            num = cls.model.delete().where(*filters).execute()
            return num

    @classmethod
    @DB.connection_context()
    def filter_update(cls, filters, update_data):
        # Update records matching given filters
        # Args:
        #     filters: List of filter conditions
        #     update_data: Updated field values
        # Returns:
        #     Number of records updated
        with DB.atomic():
            return cls.model.update(update_data).where(*filters).execute()

    @staticmethod
    def cut_list(tar_list, n):
        # Split a list into chunks of size n
        # Args:
        #     tar_list: List to split
        #     n: Chunk size
        # Returns:
        #     List of tuples containing chunks
        length = len(tar_list)
        arr = range(length)
        result = [tuple(tar_list[x : (x + n)]) for x in arr[::n]]
        return result

    @classmethod
    @DB.connection_context()
    def filter_scope_list(cls, in_key, in_filters_list, filters=None, cols=None):
        # Get records matching IN clause filters with optional column selection
        # Args:
        #     in_key: Field name for IN clause
        #     in_filters_list: List of values for IN clause
        #     filters: Additional filter conditions
        #     cols: List of columns to select
        # Returns:
        #     List of matching records
        in_filters_tuple_list = cls.cut_list(in_filters_list, 20)
        if not filters:
            filters = []
        res_list = []
        if cols:
            for i in in_filters_tuple_list:
                query_records = cls.model.select(*cols).where(getattr(cls.model, in_key).in_(i), *filters)
                if query_records:
                    res_list.extend([query_record for query_record in query_records])
        else:
            for i in in_filters_tuple_list:
                query_records = cls.model.select().where(getattr(cls.model, in_key).in_(i), *filters)
                if query_records:
                    res_list.extend([query_record for query_record in query_records])
        return res_list
