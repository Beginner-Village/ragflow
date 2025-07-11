// 早期设置publicPath，确保在webpack运行时前设置
(function () {
  'use strict';

  function shouldUseYnetflowPrefix() {
    const currentPath = window.location.pathname;
    const currentPort = window.location.port;

    // qiankun环境
    if (window.__POWERED_BY_QIANKUN__) {
      return true;
    }

    // URL路径包含ynetflow
    if (
      currentPath.includes('/ynetflow/') ||
      currentPath.endsWith('/ynetflow')
    ) {
      return true;
    }

    // 开发端口2080
    if (currentPort === '2080' && currentPath.includes('ynetflow')) {
      return true;
    }

    // nginx代理场景
    if (!currentPort && currentPath.startsWith('/ynetflow')) {
      return true;
    }

    return false;
  }

  // 设置公共路径
  const publicPath = shouldUseYnetflowPrefix() ? '/ynetflow/' : '/';

  // 设置webpack公共路径
  window.__webpack_public_path__ = publicPath;

  // 全局变量，供后续使用
  window.YNETFLOW_PUBLIC_PATH = publicPath;

  console.log('🔧 [Very Early] 设置 publicPath 为', publicPath);
})();
