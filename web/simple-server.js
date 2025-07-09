const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 2080;
const DIST_PATH = path.join(__dirname, 'dist');

// MIME 类型映射
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

// API模拟响应
const mockApiResponses = {
  '/v1/user/login': {
    code: 0,
    data: {
      access_token: 'mock-token-123456',
      avatar: '',
      nickname: 'Demo User',
      email: 'demo@ragflow.com',
    },
    message: 'success',
  },
  '/v1/user/info': {
    code: 0,
    data: {
      avatar: '',
      nickname: 'Demo User',
      email: 'demo@ragflow.com',
      role: 'user',
    },
  },
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'text/plain';
}

function serveStaticFile(filePath, res) {
  const fullPath = path.join(DIST_PATH, filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('文件未找到');
      return;
    }

    const mimeType = getMimeType(fullPath);
    res.writeHead(200, {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=31536000',
    });
    res.end(data);
  });
}

function serveIndexHtml(res) {
  const indexPath = path.join(DIST_PATH, 'index.html');

  fs.readFile(indexPath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('服务器错误');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}

function handleApiRequest(req, res, url) {
  // 处理CORS预检请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    });
    res.end();
    return;
  }

  const mockResponse = mockApiResponses[url.pathname];
  if (mockResponse) {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer mock-token-123456',
    });
    res.end(JSON.stringify(mockResponse));
    return;
  }

  // 默认API响应
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  });
  res.end(
    JSON.stringify({
      code: 0,
      data: {},
      message: 'Mock API response',
    }),
  );
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization',
  );

  // 处理 OPTIONS 请求
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // 健康检查
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
    );
    return;
  }

  // API请求处理
  if (pathname.startsWith('/v1/')) {
    handleApiRequest(req, res, parsedUrl);
    return;
  }

  // 处理静态文件
  let filePath = pathname;

  // 移除 /ragflow 前缀（微应用模式）
  if (filePath.startsWith('/ragflow/')) {
    filePath = filePath.substring(8);
  }

  // 如果是根路径，返回 index.html
  if (filePath === '/' || filePath === '') {
    serveIndexHtml(res);
    return;
  }

  const fullPath = path.join(DIST_PATH, filePath);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      // 文件不存在，检查是否是 SPA 路由
      // 如果路径包含文件扩展名，说明是静态资源请求，返回 404
      // 否则是 SPA 路由，返回 index.html
      const hasExtension = path.extname(filePath) !== '';
      if (hasExtension) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('文件未找到: ' + filePath);
      } else {
        serveIndexHtml(res);
      }
    } else {
      // 文件存在，直接返回
      serveStaticFile(filePath, res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 RAGFlow Web 服务已启动！

📍 服务地址:
  - 独立访问: http://localhost:${PORT}
  - 微应用模式: http://localhost:${PORT}/ragflow/
  - 健康检查: http://localhost:${PORT}/health

🔧 配置信息:
  - 端口: ${PORT}
  - 环境: ${process.env.NODE_ENV || 'production'}
  - 静态文件目录: ${DIST_PATH}

📋 启动说明:
  1. 独立访问: 直接在浏览器中打开 http://localhost:${PORT}
  2. 微应用集成: 在主应用中配置 entry 为 http://localhost:${PORT}/ragflow/
  
⚠️  注意: 
  - API 请求需要通过反向代理转发到后端服务
  - 本服务仅提供静态文件服务和 SPA 路由支持
  - 提供模拟API响应，无需后端服务
  `);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `❌ 端口 ${PORT} 已被占用，请使用其他端口或停止占用该端口的进程`,
    );
  } else {
    console.error('❌ 服务器启动失败:', err.message);
  }
  process.exit(1);
});
