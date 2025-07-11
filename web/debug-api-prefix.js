// 测试API前缀检测逻辑的独立脚本
// 可以在浏览器控制台中直接运行

console.log('🔧 开始测试API前缀检测逻辑...');

// 模拟 shouldUseYnetflowPrefix 函数
function shouldUseYnetflowPrefix() {
  // 1. 检查是否在qiankun环境中
  if (window.__POWERED_BY_QIANKUN__) {
    console.log('✅ 检测到qiankun环境');
    return true;
  }

  // 2. 检查URL路径是否包含/ynetflow/
  const currentPath = window.location.pathname;
  if (currentPath.includes('/ynetflow/')) {
    console.log('✅ URL路径包含/ynetflow/', currentPath);
    return true;
  }

  // 3. 检查是否在微应用开发端口上运行且URL包含ynetflow
  const currentPort = window.location.port;
  const currentHash = window.location.hash;
  if (
    currentPort === '2080' &&
    (currentPath.includes('ynetflow') || currentHash)
  ) {
    console.log('✅ 端口2080且包含ynetflow相关信息', {
      currentPort,
      currentPath,
      currentHash,
    });
    return true;
  }

  console.log('❌ 不满足ynetflow前缀条件');
  return false;
}

// 模拟 getApiPrefix 函数
function getApiPrefix() {
  if (shouldUseYnetflowPrefix()) {
    const publicPath = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
    if (publicPath) {
      console.log('✅ 使用注入的公共路径:', publicPath);
      return publicPath.slice(0, -1);
    }
    console.log('✅ 使用默认的ynetflow前缀');
    return '/ynetflow';
  }
  console.log('❌ 不使用API前缀');
  return '';
}

// 执行测试
const currentInfo = {
  url: window.location.href,
  pathname: window.location.pathname,
  port: window.location.port,
  hash: window.location.hash,
  qiankunEnv: !!window.__POWERED_BY_QIANKUN__,
  injectedPath: window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__,
};

console.group('📊 当前环境信息');
console.table(currentInfo);
console.groupEnd();

const shouldUsePrefix = shouldUseYnetflowPrefix();
const apiPrefix = getApiPrefix();

console.group('🎯 测试结果');
console.log('是否使用ynetflow前缀:', shouldUsePrefix);
console.log('API前缀:', apiPrefix || '无前缀');
console.groupEnd();

// 测试API URL构造
const testApiPaths = ['/v1/user/info', '/v1/kb/list', '/v1/user/login'];
console.group('🌐 API URL构造测试');
testApiPaths.forEach((path) => {
  const finalUrl = apiPrefix ? `${apiPrefix}${path}` : path;
  console.log(`${path} → ${finalUrl}`);
});
console.groupEnd();

// 将结果保存到全局变量
window.ynetflowApiDebug = {
  shouldUsePrefix,
  apiPrefix,
  currentInfo,
  testUrls: testApiPaths.map((path) => ({
    original: path,
    final: apiPrefix ? `${apiPrefix}${path}` : path,
  })),
};

console.log('💾 测试结果已保存到 window.ynetflowApiDebug');
