/**
 * PDF Worker 路径工具函数
 * 根据不同的环境（开发环境、生产环境、微服务环境）返回正确的 worker 路径
 */
export function getPdfWorkerPath(): string {
  // 检查是否在 qiankun 微服务环境中
  if (window.__POWERED_BY_QIANKUN__) {
    const publicPath = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || '';
    return `${publicPath}pdfjs-dist/pdf.worker.min.js`;
  }

  // 生产环境
  if (process.env.NODE_ENV === 'production') {
    return '/ragflow/pdfjs-dist/pdf.worker.min.js';
  }

  // 开发环境
  return '/pdfjs-dist/pdf.worker.min.js';
}
