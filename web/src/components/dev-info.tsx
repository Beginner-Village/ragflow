import {
  getApiPrefix,
  getBaseUrl,
  getPdfWorkerPath,
  getResourcePath,
  shouldUseYnetflowPrefix,
} from '@/utils/path-util';
import React from 'react';

const DevInfo: React.FC = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const debugInfo = {
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      qiankunEnv: !!(window as any).__POWERED_BY_QIANKUN__,
      injectedPublicPath: (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__,
      currentURL: window.location.href,
      currentPath: window.location.pathname,
      currentPort: window.location.port,
      currentHash: window.location.hash,
    },
    pathDetection: {
      shouldUseYnetflowPrefix: shouldUseYnetflowPrefix(),
      apiPrefix: getApiPrefix(),
      baseUrl: getBaseUrl(),
      pdfWorkerPath: getPdfWorkerPath(),
      logoPath: getResourcePath('logo.svg'),
    },
  };

  // 在控制台输出调试信息
  React.useEffect(() => {
    console.group('🔧 RAGFlow Path Detection Debug Info');
    console.table(debugInfo.environment);
    console.table(debugInfo.pathDetection);
    console.groupEnd();

    // 将调试信息挂载到全局对象上，方便在控制台中访问
    (window as any).ragflowDebug = debugInfo;
    console.log('💡 调试信息已挂载到 window.ragflowDebug');
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'Monaco, Consolas, monospace',
        maxWidth: '300px',
        lineHeight: '1.3',
      }}
    >
      <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>
        🔧 RAGFlow Debug
      </div>
      <div>
        前缀模式: {shouldUseYnetflowPrefix() ? '✅ /ynetflow' : '❌ 无前缀'}
      </div>
      <div>API前缀: {getApiPrefix() || '无'}</div>
      <div style={{ marginTop: '4px', fontSize: '10px', opacity: 0.8 }}>
        查看控制台获取详细信息
      </div>
    </div>
  );
};

export default DevInfo;
