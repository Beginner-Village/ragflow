/**
 * 获取静态资源的正确路径
 * 支持独立运行和微前端环境
 */

// 检查是否在 qiankun 环境中运行
function isQiankunEnv(): boolean {
  return !!(window as any).__POWERED_BY_QIANKUN__;
}

// 获取当前的 public path
function getPublicPath(): string {
  if (isQiankunEnv()) {
    // 在微前端环境中，获取注入的 public path
    return (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || '/ragflow/';
  }

  // 独立运行时的路径
  if (process.env.NODE_ENV === 'production') {
    return '/ragflow/';
  }

  return '/';
}

/**
 * 获取静态资源的完整路径
 * @param resourcePath - 相对路径，如 'pdfjs-dist/pdf.worker.min.js'
 * @returns 完整的资源路径
 */
export function getResourcePath(resourcePath: string): string {
  const publicPath = getPublicPath();

  // 确保路径格式正确
  const cleanResourcePath = resourcePath.startsWith('/')
    ? resourcePath.slice(1)
    : resourcePath;
  const cleanPublicPath = publicPath.endsWith('/')
    ? publicPath
    : `${publicPath}/`;

  return `${cleanPublicPath}${cleanResourcePath}`;
}

/**
 * 获取 PDF Worker 的路径
 */
export function getPdfWorkerPath(): string {
  return getResourcePath('pdfjs-dist/pdf.worker.min.js');
}

/**
 * 获取 Monaco Editor 的路径
 */
export function getMonacoPath(): string {
  return getResourcePath('vs/');
}

/**
 * 获取图标字体的路径
 */
export function getIconFontPath(): string {
  return getResourcePath('iconfont.js');
}

/**
 * 获取 Logo 的路径
 */
export function getLogoPath(): string {
  return getResourcePath('logo.svg');
}

/**
 * 动态设置 PDF.js worker 源
 */
export function setPdfWorkerSrc(): void {
  // 检查是否已经导入了 PDF.js
  if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
    const pdfjs = (window as any).pdfjsLib;
    if (pdfjs.GlobalWorkerOptions) {
      pdfjs.GlobalWorkerOptions.workerSrc = getPdfWorkerPath();
    }
  }
}

/**
 * 等待 PDF.js 加载完成并设置 worker 源
 */
export function setupPdfWorker(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
      setPdfWorkerSrc();
      resolve();
      return;
    }

    // 等待 PDF.js 加载
    const checkPdfjs = () => {
      if (typeof window !== 'undefined' && (window as any).pdfjsLib) {
        setPdfWorkerSrc();
        resolve();
      } else {
        setTimeout(checkPdfjs, 100);
      }
    };

    checkPdfjs();
  });
}

// 在模块加载时自动设置
if (typeof window !== 'undefined') {
  setupPdfWorker();
}
