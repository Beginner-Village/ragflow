# RAGFlow 导航栏路由信息

本文档记录了在将界面作为微服务嵌入到其他站点时，被移除的导航栏中包含的五个主要路由信息。

## 已移除的导航栏路由

### 1. 知识库 (Knowledge Base)
- **路由路径**: `/knowledge` 或 `/datasets`
- **新版路由**: `/datasets` 
- **图标**: Library (书籍图标)
- **功能**: 管理知识库，包括数据集的创建、编辑和管理
- **对应页面**: `@/pages/datasets`

### 2. 对话 (Chat)
- **路由路径**: `/chat` 或 `/next-chats`
- **新版路由**: `/next-chats`
- **图标**: MessageSquareText (消息图标)
- **功能**: 智能对话界面，与AI进行交互
- **对应页面**: `@/pages/next-chats`

### 3. 搜索 (Search)
- **路由路径**: `/search` 或 `/next-searches`
- **新版路由**: `/next-searches`
- **图标**: Search (搜索图标)
- **功能**: 智能搜索功能，在知识库中搜索相关内容
- **对应页面**: `@/pages/next-searches`

### 4. 工作流 (Flow/Agent)
- **路由路径**: `/flow` 或 `/agents`
- **新版路由**: `/agents`
- **图标**: Cpu (处理器图标)
- **功能**: 创建和管理AI工作流和智能体
- **对应页面**: `@/pages/agents`

### 5. 文件管理 (File Manager)
- **路由路径**: `/file` 或 `/files`
- **新版路由**: `/files`
- **图标**: File (文件图标)
- **功能**: 文件上传、管理和组织
- **对应页面**: `@/pages/files`

## 首页路由
- **路由路径**: `/home`
- **图标**: House (房屋图标)
- **功能**: 系统首页和概览
- **对应页面**: `@/pages/home`

## 布局修改说明

### 修改的文件
1. `src/layouts/index.tsx` - 移除了旧版导航栏 `Header` 组件
2. `src/layouts/next.tsx` - 移除了新版导航栏 `Header` 组件

### 移除的组件
- `src/layouts/components/header/index.tsx` - 旧版导航栏组件
- `src/layouts/next-header.tsx` - 新版导航栏组件
- `src/layouts/components/right-toolbar/index.tsx` - 右侧工具栏
- `src/layouts/components/user/index.tsx` - 用户头像组件

## 微服务嵌入建议

由于导航栏已被移除，建议在父站点中：

1. **路由导航**: 通过父站点的导航系统来访问这些路由
2. **用户认证**: 需要在父站点处理用户认证和会话管理
3. **主题切换**: 可通过父站点控制主题（深色/浅色模式）
4. **语言切换**: 可通过父站点控制多语言切换
5. **帮助文档**: 需要在父站点提供帮助文档链接

## 直接访问路由

如果需要直接访问某个功能页面，可以使用以下URL：

```
http://your-domain:9222/datasets     # 知识库
http://your-domain:9222/next-chats   # 对话
http://your-domain:9222/next-searches # 搜索  
http://your-domain:9222/agents       # 工作流
http://your-domain:9222/files        # 文件管理
http://your-domain:9222/home         # 首页
```

## 注意事项

1. 所有页面现在都是全屏显示，没有顶部导航栏
2. 用户需要通过父站点的导航来切换不同功能
3. 认证状态需要在父站点维护
4. 如需恢复导航栏，请恢复上述被修改的布局文件 