(function () {
  'use strict';

  // 关键修复：直接使用 qiankun 注入的动态 public-path
  // 不要自行根据 url 判断，这是 qiankun 的核心机制
  if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
})();
