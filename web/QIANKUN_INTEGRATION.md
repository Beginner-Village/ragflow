# RAGFlow 微应用集成指南

## 🎉 微应用配置完成

RAGFlow 已成功配置为 qiankun 微应用，可以嵌入到 Vue 主应用中。

## 🚀 如何访问

### 1. 独立访问（开发模式）
直接访问 `http://localhost:9222` 或 `http://localhost:9222/ragflow/` 即可看到完整的 RAGFlow 应用界面。

### 2. 微应用模式
通过 qiankun 在主应用中加载，容器 ID 为 `#ragflow-container`。

## ✅ 已完成的配置

### 1. 资源路径配置
- ✅ 设置了 `base: '/ragflow/'` 和 `publicPath: '/ragflow/'`
- ✅ 所有静态资源都使用 `/ragflow/` 前缀，避免与主应用资源冲突
- ✅ 支持独立部署和微应用模式

### 2. 路由配置
- ✅ 使用 hash 路由 (`history: { type: 'hash' }`)
- ✅ 适合微应用场景，避免路由冲突

### 3. qiankun 微应用配置
- ✅ 添加了 `name: "ragflow-web"` 到 `package.json`
- ✅ 配置了 qiankun 插件和 webpack 设置
- ✅ 添加了微应用生命周期钩子
- ✅ 支持 UMD 模块导出

### 4. 开发服务器
- ✅ 运行在 `http://localhost:9222`
- ✅ 支持跨域访问
- ✅ 自动处理微应用生命周期

## 🔧 Vue 主应用集成步骤

### 步骤 1: 安装 qiankun

```bash
npm install qiankun --save
# 或
yarn add qiankun
```

### 步骤 2: 在 Vue 主应用中注册微应用

在 `main.js` 或 `main.ts` 中：

```javascript
import { createApp } from 'vue'
import { registerMicroApps, start } from 'qiankun'
import App from './App.vue'

// 注册微应用
registerMicroApps([
  {
    name: 'ragflow',
    entry: 'http://localhost:9222/ragflow/', // 开发环境
    // entry: 'http://your-domain.com/ragflow/', // 生产环境
    container: '#ragflow-container', // 微应用挂载的容器
    activeRule: '/ragflow', // 微应用的激活规则
    props: {
      // 可以传递给微应用的数据
      routerBase: '/ragflow',
    },
  },
])

// 启动 qiankun
start()

// 创建 Vue 应用
const app = createApp(App)
app.mount('#app')
```

### 步骤 3: 在 Vue 组件中添加容器

在需要显示微应用的 Vue 组件中：

```vue
<template>
  <div>
    <h1>主应用</h1>
    <!-- 微应用容器 -->
    <div id="ragflow-container"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 可以在这里处理微应用的加载状态
    console.log('主应用已挂载')
  }
}
</script>

<style>
#ragflow-container {
  width: 100%;
  height: 100vh; /* 根据需要调整高度 */
}
</style>
```

### 步骤 4: 配置路由（可选）

如果使用 Vue Router，可以配置路由来控制微应用的显示：

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/ragflow',
    name: 'RAGFlow',
    component: () => import('./views/RAGFlowContainer.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

## 🚀 生产环境部署

### 1. 构建微应用

```bash
cd /path/to/ragflow/web
npm run build
```

### 2. 部署微应用

将构建后的文件部署到 web 服务器，确保：
- 静态文件可以通过 `/ragflow/` 路径访问
- 支持跨域访问（CORS）
- 入口文件 `umi.js` 可以被主应用加载

### 3. 更新主应用配置

在生产环境中，更新微应用的 entry 地址：

```javascript
registerMicroApps([
  {
    name: 'ragflow',
    entry: 'https://your-domain.com/ragflow/', // 生产环境地址
    container: '#ragflow-container',
    activeRule: '/ragflow',
  },
])
```

## 🛠️ 高级配置

### 1. 微应用间通信

可以通过 qiankun 的全局状态管理进行通信：

```javascript
import { initGlobalState } from 'qiankun'

// 初始化全局状态
const actions = initGlobalState({
  user: null,
  theme: 'light'
})

// 在主应用中监听状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log('状态变化:', state, prev)
})

// 设置全局状态
actions.setGlobalState({
  user: { name: 'admin' }
})
```

### 2. 样式隔离

qiankun 会自动处理样式隔离，但如果需要自定义：

```javascript
registerMicroApps([
  {
    name: 'ragflow',
    entry: 'http://localhost:9222/ragflow/',
    container: '#ragflow-container',
    activeRule: '/ragflow',
    sandbox: {
      strictStyleIsolation: true, // 严格样式隔离
      // experimentalStyleIsolation: true, // 实验性样式隔离
    }
  },
])
```

### 3. 错误处理

```javascript
import { addErrorHandler } from 'qiankun'

addErrorHandler((error) => {
  console.error('微应用加载错误:', error)
  // 可以在这里添加错误上报逻辑
})
```

## 📝 注意事项

1. **跨域问题**: 确保微应用服务器支持跨域访问
2. **路径配置**: 确保所有资源路径都使用 `/ragflow/` 前缀
3. **端口冲突**: 开发环境中确保端口不冲突
4. **浏览器兼容性**: qiankun 需要现代浏览器支持
5. **性能优化**: 可以考虑预加载微应用以提升用户体验

## 🔍 故障排除

### 1. 微应用无法加载

检查：
- 网络连接和跨域配置
- 微应用的 entry 地址是否正确
- 浏览器控制台是否有错误信息

### 2. 路由不匹配错误

**错误信息**: `<Router basename="/ragflow"> is not able to match the URL "/" because it does not start with the basename`

**原因**: 开发环境和生产环境的路由配置不同
- 开发环境使用 `http://localhost:9222/` 作为入口
- 生产环境使用 `http://your-domain/ragflow/` 作为入口

**解决方案**: 
- 开发环境下这个警告是正常的，不影响功能
- 在 qiankun 中使用 `entry: 'http://localhost:9222/'` （不带 ragflow 路径）
- 生产环境部署时使用完整的路径

### 3. 直接访问空白页面

**问题**: 直接访问 `http://localhost:9222/#/knowledge` 显示空白页面

**解决方案**:
- 使用提供的 `test-direct-access.html` 来诊断问题
- 检查浏览器控制台是否有 JavaScript 错误
- 确认开发服务器正在运行

### 4. 样式冲突

解决方案：
- 启用样式隔离
- 使用 CSS Modules 或 styled-components
- 检查全局样式的影响

### 5. Vue 测试页面 DOM 错误

**错误信息**: `Cannot read properties of null (reading 'insertBefore')`

**原因**: Vue 和 React 应用的 DOM 操作冲突

**解决方案**: 
- 确保在卸载微应用时正确清理容器
- 避免频繁的加载/卸载操作

### 6. 资源加载 404

**问题**: 字体文件等静态资源返回 404

**解决方案**:
- 开发环境下部分字体文件 404 是正常的
- 确保 `publicPath` 配置正确
- 生产环境确保所有资源都部署到正确路径

## 📞 技术支持

如有问题，请检查：
1. qiankun 官方文档: https://qiankun.umijs.org/
2. UMI 官方文档: https://umijs.org/
3. 浏览器开发者工具的控制台错误信息

---

🎉 **恭喜！RAGFlow 现在可以作为微应用集成到您的 Vue 项目中了！** 