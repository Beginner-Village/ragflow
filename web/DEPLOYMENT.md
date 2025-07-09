# 🚀 RAGFlow Web 部署指南

## 📋 概述

本文档详细说明了如何将 RAGFlow Web 应用构建和部署为在 2080 端口运行的生产服务。应用支持两种访问模式：

1. **独立访问模式**: 直接访问 `http://localhost:2080`
2. **微应用模式**: 通过 qiankun 集成，入口为 `http://localhost:2080/ragflow/`

## 🛠️ 环境要求

- Node.js >= 18.20.4
- npm >= 8.0.0
- 系统内存 >= 2GB
- 磁盘空间 >= 1GB

## 📦 部署方式

### 方式一：本地部署（推荐）

#### 1. 快速部署
```bash
# 一键构建并启动服务
npm run serve
```

#### 2. 分步部署
```bash
# 安装依赖
npm install

# 构建应用
npm run build

# 启动生产服务
npm run start:prod
```

#### 3. 使用部署脚本
```bash
# 执行部署脚本（包含环境检查和构建验证）
./deploy.sh
```

### 方式二：Docker 部署

#### 1. 构建镜像
```bash
docker build -t ragflow-web .
```

#### 2. 运行容器
```bash
docker run -d \
  --name ragflow-web \
  -p 2080:2080 \
  -e API_TARGET=http://your-api-server:9380 \
  ragflow-web
```

#### 3. 使用 Docker Compose
```bash
# 启动服务
docker-compose up -d

# 查看日志
docker-compose logs -f ragflow-web

# 停止服务
docker-compose down
```

## ⚙️ 配置选项

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `PORT` | `2080` | 服务监听端口 |
| `API_TARGET` | `http://10.10.10.225:9380` | 后端API服务地址 |
| `NODE_ENV` | `production` | 运行环境 |

### 示例配置

```bash
# 自定义端口和API地址
PORT=8080 API_TARGET=http://192.168.1.100:9380 npm run start:prod

# 生产环境
NODE_ENV=production PORT=2080 npm run start:prod
```

## 🔍 验证部署

### 1. 健康检查
```bash
curl http://localhost:2080/health
```

预期响应：
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "port": 2080,
  "mode": "production"
}
```

### 2. 独立访问测试
在浏览器中访问：`http://localhost:2080`

### 3. 微应用模式测试
在浏览器中访问：`http://localhost:2080/ragflow/`

### 4. API代理测试
```bash
curl http://localhost:2080/v1/user/info
```

## 🐛 常见问题及解决方案

### 1. PDF 加载错误

**问题**: `Uncaught SyntaxError: Unexpected token '<'`

**原因**: PDF worker 文件路径不正确

**解决方案**: 
- 确保 `public/pdfjs-dist/pdf.worker.min.js` 文件存在
- 构建时会自动复制到 `dist/pdfjs-dist/` 目录
- 代码已自动处理不同环境的路径配置

### 2. 微服务访问 404

**问题**: 在 qiankun 环境下资源加载失败

**原因**: 资源路径配置问题

**解决方案**:
- 确保主应用配置正确的 entry 路径
- 检查 CORS 配置是否正确
- 验证微应用生命周期函数

### 3. API 请求失败

**问题**: 接口请求返回 404 或超时

**解决方案**:
```bash
# 检查后端服务是否运行
curl http://10.10.10.225:9380/v1/health

# 修改API目标地址
API_TARGET=http://correct-api-server:port npm run start:prod
```

### 4. 端口占用

**问题**: `Error: listen EADDRINUSE: address already in use :::2080`

**解决方案**:
```bash
# 查找占用端口的进程
lsof -i :2080

# 终止进程
kill -9 <PID>

# 或使用其他端口
PORT=3000 npm run start:prod
```

### 5. 内存不足

**问题**: 构建过程中内存溢出

**解决方案**:
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## 📊 性能优化

### 1. 生产环境优化

- ✅ 已启用代码压缩和混淆
- ✅ 已启用文件hash以支持缓存
- ✅ 已禁用开发工具和热更新
- ✅ 已优化静态资源加载

### 2. 服务器配置

```bash
# 启用 PM2 进程管理
npm install -g pm2

# 创建 PM2 配置文件
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'ragflow-web',
    script: 'server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 2080
    }
  }]
}
EOF

# 启动服务
pm2 start ecosystem.config.js
```

## 🔒 安全配置

### 1. 反向代理（Nginx）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:2080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        proxy_pass http://localhost:2080;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 2. HTTPS 配置

```bash
# 使用 Let's Encrypt
certbot --nginx -d your-domain.com
```

## 📝 监控和日志

### 1. 应用日志

```bash
# 查看服务日志
npm run start:prod 2>&1 | tee logs/app.log

# 使用 Docker 查看日志
docker-compose logs -f ragflow-web
```

### 2. 性能监控

```javascript
// 在 server.js 中添加性能监控
const startTime = Date.now();
app.get('/metrics', (req, res) => {
  res.json({
    uptime: Date.now() - startTime,
    memory: process.memoryUsage(),
    cpu: process.cpuUsage()
  });
});
```

## 🔄 更新部署

### 1. 应用更新

```bash
# 拉取最新代码
git pull origin main

# 重新构建和启动
npm run serve
```

### 2. 零停机更新

```bash
# 使用 PM2
pm2 reload ragflow-web

# 使用 Docker
docker-compose up -d --no-deps ragflow-web
```

## 📞 技术支持

### 故障排查检查清单

- [ ] Node.js 版本是否符合要求（>= 18.20.4）
- [ ] 依赖是否正确安装（`npm install`）
- [ ] 构建是否成功（`dist/index.html` 存在）
- [ ] 端口是否被占用（`lsof -i :2080`）
- [ ] 后端API服务是否可达
- [ ] 防火墙是否允许访问
- [ ] 浏览器控制台是否有错误信息

### 获取帮助

1. 检查服务状态：`curl http://localhost:2080/health`
2. 查看详细日志：`npm run start:prod --verbose`
3. 验证配置：检查环境变量和网络连接

---

🎉 **恭喜！按照以上步骤，您的 RAGFlow Web 应用现在应该可以在 2080 端口正常运行了！** 