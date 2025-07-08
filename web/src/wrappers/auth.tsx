import { useAuth } from '@/hooks/auth-hooks';
import { Spin } from 'antd';
import { Outlet, useLocation } from 'umi';

export default () => {
  const { isLogin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" tip="正在自动登录..."></Spin>
      </div>
    );
  }

  // If we are on the login page, render it.
  // This might happen if auto-login fails and the user manually navigates there.
  if (location.pathname === '/login' || location.pathname === '/login-next') {
    return <Outlet />;
  }

  if (isLogin) {
    return <Outlet />;
  }

  // If not loading and not logged in (i.e., auto-login failed),
  // render nothing to prevent showing a broken page or redirecting.
  return null;
};
