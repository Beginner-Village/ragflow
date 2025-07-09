# RAGFlow Web Dockerfile
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production --silent

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 复制静态资源
RUN if [ -d "public/pdfjs-dist" ]; then cp -r public/pdfjs-dist dist/; fi

# 生产环境镜像
FROM node:18-alpine AS runner

WORKDIR /app

# 只安装生产依赖
COPY package*.json ./
RUN npm ci --only=production --silent && npm cache clean --force

# 从构建阶段复制构建产物
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S ragflow -u 1001
USER ragflow

# 暴露端口
EXPOSE 2080

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:2080/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

# 启动应用
CMD ["node", "server.js"] 