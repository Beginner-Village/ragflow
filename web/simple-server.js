const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 2080;
const DIST_PATH = path.join(__dirname, 'dist');

// 0. 全局启用 CORS
app.use(cors());

// 1. API PROXY RULES (MUST COME BEFORE STATIC SERVING)

// 为生产打包测试添加代理 (带前缀的路径)
app.use(
  '/ynetflow/v1',
  createProxyMiddleware({
    target: 'http://10.10.10.225:9380',
    changeOrigin: true,
    // 修复规则 1:
    pathRewrite: function (path, req) {
      // 对于 /ynetflow/v1/user/info, path 的值是 /user/info
      const newPath = '/v1' + path; // 重新构造为 /v1/user/info
      console.log(
        `[带前缀转发日志] 收到: "/ynetflow/v1${path}"  =>  构造为: "${newPath}"`,
      );
      return newPath;
    },
    logLevel: 'debug', // 保留HPM的详细日志
    onProxyReq: function (proxyReq, req, res) {
      // 在请求被转发前，打印出最终的路径
      console.log(
        `[FORWARD-LOG] 实际转发路径: ${proxyReq.method} ${proxyReq.path}`,
      );
    },
  }),
);

// 为本地开发添加代理 (无前缀路径), 也服务于打包后的直接 /v1 请求
app.use(
  '/v1',
  createProxyMiddleware({
    target: 'http://10.10.10.225:9380',
    changeOrigin: true,
    // 修复规则 2:
    pathRewrite: function (path, req) {
      // 对于 /v1/document/image/..., path 的值是 /document/image/...
      const newPath = '/v1' + path; // 同样需要重新构造为 /v1/document/image/...
      console.log(
        `[无前缀转发日志] 收到: "/v1${path}"  =>  构造为: "${newPath}"`,
      );
      return newPath;
    },
  }),
);

// 2. STATIC FILE SERVING
// Serve static files from dist directory under /ynetflow path
app.use('/ynetflow', express.static(DIST_PATH));

// 3. SPA FALLBACK
// For any other GET request, serve index.html for client-side routing.
// This must come after static serving.
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n✅ 服务已启动!`);
  console.log(`- 微应用入口 (开发或打包): http://localhost:${PORT}/ynetflow`);
  console.log(`- API 代理 (开发):   /v1 -> http://10.10.10.225:9380`);
  console.log(`- API 代理 (打包):   /ynetflow/v1 -> http://10.10.10.225:9380`);
  console.log(
    `\n请运行 'npm run dev:micro' (开发) 或 'npm run serve:micro:demo' (打包测试)\n`,
  );
});
