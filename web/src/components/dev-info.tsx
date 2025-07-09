import { getPdfWorkerPath, getResourcePath } from '@/utils/resource-path';
import { Alert, Button, Card, Space, Typography } from 'antd';
import { useState } from 'react';

const { Text, Title } = Typography;

/**
 * 开发环境调试信息组件
 * 仅在开发环境显示，用于调试微前端相关问题
 */
const DevInfo: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // 仅在开发环境显示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const isQiankun = !!(window as any).__POWERED_BY_QIANKUN__;
  const publicPath =
    (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || 'N/A';
  const currentUrl = window.location.href;

  const resourcePaths = {
    'PDF Worker': getPdfWorkerPath(),
    Logo: getResourcePath('logo.svg'),
    IconFont: getResourcePath('iconfont.js'),
    'Monaco Editor': getResourcePath('vs/'),
  };

  const environmentInfo = {
    运行环境: isQiankun ? '微前端 (qiankun)' : '独立运行',
    当前URL: currentUrl,
    注入的PublicPath: publicPath,
    NODE_ENV: process.env.NODE_ENV,
  };

  if (!visible) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: 9999,
        }}
      >
        <Button size="small" type="primary" onClick={() => setVisible(true)}>
          Debug Info
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 10,
        right: 10,
        width: 400,
        zIndex: 9999,
        maxHeight: '80vh',
        overflow: 'auto',
      }}
    >
      <Card
        title="RAGFlow 调试信息"
        size="small"
        extra={
          <Button size="small" onClick={() => setVisible(false)}>
            关闭
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Title level={5}>环境信息</Title>
            {Object.entries(environmentInfo).map(([key, value]) => (
              <div key={key}>
                <Text strong>{key}: </Text>
                <Text code>{value}</Text>
              </div>
            ))}
          </div>

          <div>
            <Title level={5}>资源路径</Title>
            {Object.entries(resourcePaths).map(([key, value]) => (
              <div key={key}>
                <Text strong>{key}: </Text>
                <Text code style={{ fontSize: '12px' }}>
                  {value}
                </Text>
              </div>
            ))}
          </div>

          <Alert
            message="调试提示"
            description={
              <div>
                <p>• PDF Worker 路径正确是解决 PDF 显示问题的关键</p>
                <p>• 在微前端环境中，所有静态资源都应使用动态路径</p>
                <p>
                  • 如果 PDF 仍然无法显示，请检查浏览器开发者工具的 Network 面板
                </p>
              </div>
            }
            type="info"
            showIcon
          />

          <Button
            block
            onClick={() => {
              console.log('=== RAGFlow Debug Info ===');
              console.log('Environment:', environmentInfo);
              console.log('Resource Paths:', resourcePaths);
              console.log('PDF Worker Path:', getPdfWorkerPath());

              // 测试 PDF Worker 是否可访问
              fetch(getPdfWorkerPath())
                .then((response) => {
                  console.log('PDF Worker accessible:', response.ok);
                  if (!response.ok) {
                    console.error(
                      'PDF Worker fetch failed:',
                      response.status,
                      response.statusText,
                    );
                  }
                })
                .catch((error) => {
                  console.error('PDF Worker fetch error:', error);
                });
            }}
          >
            输出到控制台
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default DevInfo;
