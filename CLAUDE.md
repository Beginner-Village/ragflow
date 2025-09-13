# RAGFlow 定制化改造方案

## 项目概述
将 RAGFlow 改造为 YnetFlow，包含品牌变更、API增强和知识库级别鉴权功能。

## 变更记录

### 1. 配置文件备份
- ✅ 已备份：`web/.umirc.ts.backup`
- ✅ 已备份：`web/package.json.backup` 
- ✅ 已备份：`conf/service_conf.yaml.backup`

### 2. 品牌化变更计划

#### 2.1 前端路由修改
- **目标**：将所有 `ragflow` 路由改为 `YnetFlow`
- **涉及文件**：
  - `web/.umirc.ts` - 代理配置
  - `web/src/routes.tsx` - 路由定义
  - 其他包含路由引用的组件文件

#### 2.2 图标和Logo替换
- **目标图标**：`https://agents.finmall.com/nbcbchat/static/favicon.ico`
- **涉及文件**：
  - `web/src/layouts/next-header.tsx:111` - Header中的logo
  - `web/public/logo.svg` - 公共资源
  - `web/public/favicon.ico` - 网站图标

### 3. API增强和鉴权系统

#### 3.1 现有API分析
- **主要对外API端点**：
  - `/api/retrieval` - 知识库检索API（核心）
  - `/api/completion` - 对话完成API
  - `/api/document/upload` - 文档上传API
  - `/api/list_chunks` - chunk列表API
  - `/api/list_kb_docs` - 知识库文档列表API

- **API Key管理**：
  - 生成端点：`/api/new_token`
  - 列表端点：`/api/token_list`
  - 删除端点：`/api/rm`

#### 3.2 API Key生成机制详析
- **生成函数**：`generate_confirmation_token(tenant_id)`
- **生成逻辑**：`"ragflow-" + serializer.dumps(get_uuid(), salt=tenant_id)[2:34]`
- **存储位置**：`api/utils/api_utils.py:line_number`
- **数据库表**：`APIToken` 表，包含字段：
  - `tenant_id` - 租户ID
  - `dialog_id` - 关联的对话/Canvas ID
  - `token` - 生成的API Key
  - `source` - 来源（agent/dialog）

#### 3.3 当前鉴权机制
- **鉴权方式**：Bearer Token在Authorization头
- **权限级别**：基于租户(tenant)级别，不支持知识库级别
- **Token验证**：通过`APIToken.query(token=token)`验证

#### 3.4 核心检索API：`/retrieval`
- **必需参数**：`kb_id`, `question`
- **可选参数**：`doc_ids`, `page`, `page_size`, `similarity_threshold`, `vector_similarity_weight`, `top_k`, `highlight`
- **返回数据**：包含chunks和相似度分数的检索结果

### 4. 技术实施计划

#### 4.1 数据库设计
- 扩展知识库表，添加API Key字段
- 创建API Key访问控制表
- 建立API Key与知识库的关联关系

#### 4.2 后端API修改
- 修改现有API Key生成逻辑
- 实现知识库级别的鉴权中间件
- 创建知识库专用的检索API端点

#### 4.3 前端界面修改
- 在知识库管理页面添加API Key管理功能
- 实现API Key的生成、查看、重置功能
- 更新所有涉及品牌的UI元素

### 5. 环境配置记录

#### 5.1 开发环境
- **Python版本**：3.11.13
- **Node.js版本**：v22.18.0
- **后端服务**：http://127.0.0.1:9380
- **前端服务**：http://localhost:9222

#### 5.2 中间件配置
- **Elasticsearch**：10.10.10.223:1200
- **MySQL**：10.10.10.223:5455
- **MinIO**：10.10.10.223:9000
- **Redis**：10.10.10.223:6379（间歇性连接问题）

## 实施状态

### 完成项目 ✅
- [x] 配置文件备份
- [x] CLAUDE.md文档创建
- [x] API文档分析和核心端点识别
- [x] 品牌化变更（RAGFlow → YnetFlow）
- [x] API Key前缀修改（ragflow- → YnetFlow-）
- [x] Logo和图标替换
- [x] 知识库API令牌数据库模型设计
- [x] 知识库API令牌服务层实现
- [x] 知识库API令牌管理端点实现

### 进行中项目 🔄
- [ ] 修改现有检索API以支持知识库级别认证
- [ ] 前端知识库令牌管理界面开发

### 待办项目 📋
- [ ] 集成测试所有变更功能
- [ ] 生产环境部署准备

## 新增API端点文档

### 知识库API令牌管理端点

#### 1. 创建知识库API令牌
- **端点**：`POST /v1/kb/{kb_id}/tokens`
- **描述**：为指定知识库创建新的API令牌
- **请求体**：
  ```json
  {
    "name": "API令牌名称",
    "description": "令牌描述（可选）",
    "permissions": ["read", "write"],
    "expires_days": 30
  }
  ```
- **响应**：返回创建的令牌信息（包含完整token值）

#### 2. 列出知识库API令牌
- **端点**：`GET /v1/kb/{kb_id}/tokens`
- **描述**：获取指定知识库的所有API令牌列表
- **响应**：返回令牌列表（不包含token值，仅显示元数据）

#### 3. 更新知识库API令牌状态
- **端点**：`PUT /v1/kb/{kb_id}/tokens/{token_id}`
- **描述**：更新API令牌状态（启用/禁用）
- **请求体**：
  ```json
  {
    "status": "active|disabled"
  }
  ```

#### 4. 删除知识库API令牌
- **端点**：`DELETE /v1/kb/{kb_id}/tokens/{token_id}`
- **描述**：永久删除指定的API令牌

### 数据库设计

#### KnowledgebaseAPIToken表结构
```sql
CREATE TABLE knowledgebase_api_token (
    id VARCHAR(32) PRIMARY KEY,
    kb_id VARCHAR(32) NOT NULL,
    tenant_id VARCHAR(32) NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    description TEXT,
    permissions JSON DEFAULT '["read"]',
    status VARCHAR(16) DEFAULT 'active',
    expires_at DATETIME,
    created_by VARCHAR(32) NOT NULL,
    create_time BIGINT,
    create_date DATETIME,
    update_time BIGINT,
    update_date DATETIME,
    INDEX idx_kb_tenant (kb_id, tenant_id),
    INDEX idx_token (token),
    INDEX idx_status (status)
);
```
- [x] API Key生成机制分析
- [x] 前端品牌化修改（应用名称：RAGFlow → YnetFlow）
- [x] 图标替换（logo源更新为新favicon）
- [x] API Key前缀修改（ragflow- → YnetFlow-）

### 进行中项目 🔄
- [ ] 知识库独立鉴权方案设计

### 待开始项目 📋
- [ ] 知识库级别API Key管理实现
- [ ] 前端知识库API Key管理界面
- [ ] 功能测试和验证

## 知识库独立鉴权设计方案

### 设计目标
1. **知识库级别隔离**：每个知识库拥有独立的API Key
2. **细粒度权限控制**：API Key只能访问特定知识库的数据
3. **向下兼容**：保持现有租户级API Key的功能
4. **安全增强**：防止跨知识库数据泄露

### 数据库设计
#### 新增表：`kb_api_tokens`
```sql
CREATE TABLE kb_api_tokens (
    id VARCHAR(255) PRIMARY KEY,
    kb_id VARCHAR(255) NOT NULL,
    tenant_id VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    description TEXT,
    permissions JSON,  -- ['read', 'write', 'delete']
    status ENUM('active', 'disabled') DEFAULT 'active',
    expires_at DATETIME,
    created_by VARCHAR(255),
    create_time BIGINT,
    create_date DATETIME,
    update_time BIGINT,
    update_date DATETIME,
    INDEX idx_kb_id (kb_id),
    INDEX idx_tenant_id (tenant_id),
    INDEX idx_token (token),
    FOREIGN KEY (kb_id) REFERENCES knowledgebase(id) ON DELETE CASCADE
);
```

### API设计
#### 新增API端点
1. **POST /api/kb/{kb_id}/tokens** - 为知识库创建API Key
2. **GET /api/kb/{kb_id}/tokens** - 列出知识库的API Keys
3. **PUT /api/kb/{kb_id}/tokens/{token_id}** - 更新API Key配置
4. **DELETE /api/kb/{kb_id}/tokens/{token_id}** - 删除API Key

#### 修改现有端点
- **POST /api/retrieval** - 增加知识库级别鉴权检查
- 其他涉及知识库访问的API端点添加权限验证

## 注意事项

1. **数据兼容性**：确保现有数据不受影响
2. **API向下兼容**：保证现有API调用仍然有效
3. **安全性**：新的鉴权机制需要保证安全性
4. **性能影响**：鉴权逻辑不应显著影响API响应时间

## 下一步行动
1. 分析用户设置API文档
2. 识别对外检索查询的API端点
3. 开始前端品牌化修改