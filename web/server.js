const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 2080;

// 设置静态文件服务 - 支持微应用模式
app.use('/ragflow', express.static(path.join(__dirname, 'dist')));

// 独立访问模式 - 根路径也服务相同内容
app.use('/', express.static(path.join(__dirname, 'dist')));

// 健康检查端点 - 必须在通配符路由之前
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    port: PORT,
    mode: 'production',
  });
});

// 简单的 API 转发说明 - 在生产环境中，通常由 nginx 等反向代理处理
app.use('/v1', (req, res) => {
  res.status(502).json({
    error: 'API 服务不可用',
    message: '请配置反向代理到后端 API 服务器',
    suggestion: '使用 nginx 或其他反向代理工具将 /v1/* 路径代理到后端服务',
  });
});

// 处理微应用路由 - SPA路由支持
app.get('/ragflow/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 处理其他所有路由 - SPA 支持（独立访问模式）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: '服务器内部错误',
    message:
      process.env.NODE_ENV === 'development' ? err.message : '请稍后重试',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 RAGFlow Web 服务已启动！

📍 服务地址:
  - 独立访问: http://localhost:${PORT}
  - 微应用模式: http://localhost:${PORT}/ragflow/
  - 健康检查: http://localhost:${PORT}/health

🔧 配置信息:
  - 端口: ${PORT}
  - 环境: ${process.env.NODE_ENV || 'production'}
  - API目标: ${process.env.API_TARGET || 'http://10.10.10.225:9380'}

📋 启动说明:
  1. 独立访问: 直接在浏览器中打开 http://localhost:${PORT}
  2. 微应用集成: 在主应用中配置 entry 为 http://localhost:${PORT}/ragflow/
  `);
});
