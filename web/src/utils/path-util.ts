/**
 * 路径工具函数
 * 统一处理微前端环境和独立运行环境的路径问题
 */

// 检查是否在 qiankun 环境中运行
export function isQiankunEnv(): boolean {
  return !!(window as any).__POWERED_BY_QIANKUN__;
}

// 检查是否需要使用ynetflow前缀（基于URL路径或qiankun环境）
export function shouldUseYnetflowPrefix(): boolean {
  // 1. 检查是否在qiankun环境中
  if (isQiankunEnv()) {
    return true;
  }

  // 2. 检查URL路径是否包含/ynetflow/或以/ynetflow结尾
  const currentPath = window.location.pathname;
  if (currentPath.includes('/ynetflow/') || currentPath.endsWith('/ynetflow')) {
    return true;
  }

  // 3. 检查是否在微应用开发端口上运行且URL包含ynetflow
  const currentPort = window.location.port;
  const currentHash = window.location.hash;
  if (
    currentPort === '2080' &&
    (currentPath.includes('ynetflow') || currentHash)
  ) {
    return true;
  }

  // 4. 检查是否通过nginx代理访问（URL不包含端口号，但路径包含ynetflow）
  // 当通过https://agent.finmall.com/ynetflow/访问时
  if (!currentPort && currentPath.startsWith('/ynetflow')) {
    return true;
  }

  return false;
}

// 获取当前的 public path
export function getPublicPath(): string {
  if (shouldUseYnetflowPrefix()) {
    // 在微前端环境中，获取注入的 public path
    const publicPath = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
    if (publicPath) {
      return publicPath;
    }
    // 如果没有注入路径，使用默认的ynetflow前缀
    return '/ynetflow/';
  }

  // 独立运行时的路径
  return '/';
}

/**
 * 获取静态资源的完整路径
 * @param resourcePath 资源相对路径，如 'logo.svg' 或 'assets/image.png'
 * @returns 完整的资源路径
 */
export function getResourcePath(resourcePath: string): string {
  const publicPath = getPublicPath();
  // 确保资源路径不以斜杠开头（避免双斜杠）
  const cleanPath = resourcePath.startsWith('/')
    ? resourcePath.slice(1)
    : resourcePath;
  return `${publicPath}${cleanPath}`;
}

/**
 * 获取API路径前缀
 * @returns API路径前缀
 */
export function getApiPrefix(): string {
  // 决定性修复：放弃使用不可靠的 process.env.MICRO_APP，
  // 转而使用基于运行时 URL 判断的、更可靠的 shouldUseYnetflowPrefix 函数。
  if (shouldUseYnetflowPrefix()) {
    return '/ynetflow';
  }
  return '';
}

/**
 * 获取完整的API URL
 * @param apiPath API路径，如 '/v1/user/info'
 * @returns 完整的API URL
 */
export function getApiUrl(apiPath: string): string {
  const prefix = getApiPrefix();
  return `${prefix}${apiPath}`;
}

/**
 * 获取基础URL（用于fetch等原生请求）
 * @returns 基础URL
 */
export function getBaseUrl(): string {
  // The base URL for API calls should be the origin,
  // without any micro-frontend path segments.
  return window.location.origin;
}

/**
 * 获取PDF Worker路径
 * @returns PDF Worker的完整路径
 */
export function getPdfWorkerPath(): string {
  return getResourcePath('pdfjs-dist/pdf.worker.min.js');
}

/**
 * 设置PDF Worker路径
 * 初始化PDF.js的worker路径
 */
export async function setupPdfWorker(): Promise<void> {
  if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
    (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = getPdfWorkerPath();
  }
}
