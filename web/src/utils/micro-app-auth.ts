import storage from './authorization-util';

/**
 * 微应用认证信息接口
 */
export interface IMicroAppAuthInfo {
  authorization: string; // Authorization header 值
  token: string; // access_token
  userInfo: {
    // 用户信息
    avatar?: string;
    name: string;
    email: string;
  };
}

/**
 * 设置微应用认证信息
 * @param authInfo 认证信息
 */
export function setMicroAppAuth(authInfo: IMicroAppAuthInfo) {
  const { authorization, token, userInfo } = authInfo;

  console.log('🔐 设置微应用认证信息:', {
    email: userInfo.email,
    hasToken: !!token,
  });

  // 存储到localStorage
  storage.setItems({
    Authorization: authorization,
    Token: token,
    userInfo: JSON.stringify(userInfo),
  });

  // 触发storage事件，通知应用状态更新
  window.dispatchEvent(new Event('storage'));

  return true;
}

/**
 * 清除微应用认证信息
 */
export function clearMicroAppAuth() {
  console.log('🔓 清除微应用认证信息');
  storage.removeAll();
  window.dispatchEvent(new Event('storage'));
}

/**
 * 检查是否已登录
 */
export function checkMicroAppAuth(): boolean {
  const authorization = storage.getAuthorization();
  const token = storage.getToken();
  return !!(authorization && token);
}

/**
 * 获取当前用户信息
 */
export function getMicroAppUserInfo() {
  try {
    return storage.getUserInfoObject();
  } catch (error) {
    console.warn('获取用户信息失败:', error);
    return null;
  }
}

/**
 * 从主应用登录信息转换为RAGFlow格式
 * @param mainAppAuth 主应用的认证信息
 */
export function convertMainAppAuth(mainAppAuth: any): IMicroAppAuthInfo {
  // 根据主应用的认证信息格式进行转换
  // 这里需要根据实际的主应用认证信息结构来调整

  return {
    authorization: mainAppAuth.authorization || `Bearer ${mainAppAuth.token}`,
    token: mainAppAuth.access_token || mainAppAuth.token,
    userInfo: {
      avatar: mainAppAuth.avatar,
      name: mainAppAuth.nickname || mainAppAuth.name || mainAppAuth.email,
      email: mainAppAuth.email,
    },
  };
}

export default {
  setMicroAppAuth,
  clearMicroAppAuth,
  checkMicroAppAuth,
  getMicroAppUserInfo,
  convertMainAppAuth,
};
