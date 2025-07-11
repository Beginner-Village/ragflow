// qiankun 微应用配置
// 此文件仅在微应用模式下被加载

// qiankun 生命周期函数
export async function bootstrap(props: any) {
  console.log('ynetflow微应用bootstrap', props);
}

export async function mount(props: any) {
  console.log('ynetflow微应用mount', props);

  // 处理微应用路由
  if (props?.routerBase) {
    // 确保路由正确匹配
    const currentPath = window.location.pathname;
    const routerBase = props.routerBase;

    // 如果当前路径不包含 routerBase，则重定向
    if (!currentPath.startsWith(routerBase)) {
      window.history.pushState(
        {},
        '',
        `${routerBase}${window.location.hash || '#/'}`,
      );
    }
  }

  // 处理主应用传递的认证信息
  if (props?.authInfo) {
    try {
      const { setMicroAppAuth } = await import('@/utils/micro-app-auth');
      setMicroAppAuth(props.authInfo);
      console.log('✅ 主应用认证信息设置成功');
    } catch (error) {
      console.error('❌ 设置认证信息失败:', error);
    }
  }
}

export async function unmount(props: any) {
  console.log('ynetflow微应用unmount', props);

  // 清理认证信息
  try {
    const { clearMicroAppAuth } = await import('@/utils/micro-app-auth');
    clearMicroAppAuth();
    console.log('✅ 微应用认证信息已清理');
  } catch (error) {
    console.error('❌ 清理认证信息失败:', error);
  }
}

export async function update(props: any) {
  console.log('ynetflow微应用update', props);

  // 更新认证信息
  if (props?.authInfo) {
    try {
      const { setMicroAppAuth } = await import('@/utils/micro-app-auth');
      setMicroAppAuth(props.authInfo);
      console.log('✅ 主应用认证信息已更新');
    } catch (error) {
      console.error('❌ 更新认证信息失败:', error);
    }
  }
}
