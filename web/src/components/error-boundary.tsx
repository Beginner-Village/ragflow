import { Button, Result } from 'antd';
import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error?: Error;
    errorInfo?: React.ErrorInfo;
  }>;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error}
            errorInfo={this.state.errorInfo}
          />
        );
      }

      return (
        <Result
          status="error"
          title="应用运行出错"
          subTitle="抱歉，应用遇到了一个错误。请尝试刷新页面或联系技术支持。"
          extra={[
            <Button
              type="primary"
              key="refresh"
              onClick={() => window.location.reload()}
            >
              刷新页面
            </Button>,
            <Button key="back" onClick={() => window.history.back()}>
              返回上页
            </Button>,
          ]}
        >
          {process.env.NODE_ENV === 'development' && (
            <div
              style={{
                textAlign: 'left',
                padding: '20px',
                background: '#f5f5f5',
                borderRadius: '4px',
                marginTop: '20px',
              }}
            >
              <h4>错误详情（仅开发环境显示）：</h4>
              <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </div>
          )}
        </Result>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
