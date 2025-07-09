#!/bin/bash

# RAGFlow Web 部署脚本
# 用于构建应用并启动2080端口服务

set -e  # 遇到错误时退出

echo "🚀 开始部署 RAGFlow Web 应用..."

# 检查Node.js版本
echo "📋 检查运行环境..."
node_version=$(node -v)
echo "Node.js 版本: $node_version"

# 安装依赖
echo "📦 安装依赖..."
npm ci --only=production

# 构建应用
echo "🔨 构建应用..."
npm run build

# 复制静态资源
echo "📁 复制静态资源..."
if [ -d "public/pdfjs-dist" ]; then
  cp -r public/pdfjs-dist dist/
  echo "✅ PDF.js worker 文件已复制"
else
  echo "⚠️  警告: public/pdfjs-dist 目录不存在"
fi

# 检查构建结果
if [ ! -f "dist/index.html" ]; then
  echo "❌ 构建失败: dist/index.html 不存在"
  exit 1
fi

echo "✅ 构建完成!"

# 显示启动说明
echo "
🎉 部署完成！现在可以启动服务:

📋 启动选项:
  1. 生产环境启动: npm run start:prod
  2. 快速启动: npm run serve (包含构建)
  3. 自定义端口: PORT=3000 npm run start:prod
  4. 自定义API目标: API_TARGET=http://your-api-server:port npm run start:prod

📍 服务访问地址:
  - 独立访问: http://localhost:2080
  - 微应用模式: http://localhost:2080/ragflow/
  - 健康检查: http://localhost:2080/health

🔧 环境变量:
  - PORT: 服务端口 (默认: 2080)
  - API_TARGET: 后端API地址 (默认: http://10.10.10.225:9380)

💡 示例启动命令:
  PORT=8080 API_TARGET=http://192.168.1.100:9380 npm run start:prod
"

# 询问是否立即启动
echo "是否现在启动服务? (y/N)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
  echo "🚀 启动服务..."
  npm run start:prod
fi 