import { Authorization, Token, UserInfo } from '@/constants/authorization';
import { getSearchValue } from './common-util';
import { getApiUrl, getBaseUrl } from './path-util';

// 类型声明：qiankun微前端环境变量
declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
  }
}

const KeySet = [Authorization, Token, UserInfo];

const storage = {
  getAuthorization: () => {
    return localStorage.getItem(Authorization);
  },
  getToken: () => {
    return localStorage.getItem(Token);
  },
  getUserInfo: () => {
    return localStorage.getItem(UserInfo);
  },
  getUserInfoObject: () => {
    return JSON.parse(localStorage.getItem('userInfo') || '');
  },
  setAuthorization: (value: string) => {
    localStorage.setItem(Authorization, value);
  },
  setToken: (value: string) => {
    localStorage.setItem(Token, value);
  },
  setUserInfo: (value: string | Record<string, unknown>) => {
    let valueStr = typeof value !== 'string' ? JSON.stringify(value) : value;
    localStorage.setItem(UserInfo, valueStr);
  },
  setItems: (pairs: Record<string, string>) => {
    Object.entries(pairs).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  },
  removeAuthorization: () => {
    localStorage.removeItem(Authorization);
  },
  removeAll: () => {
    KeySet.forEach((x) => {
      localStorage.removeItem(x);
    });
  },
  setLanguage: (lng: string) => {
    localStorage.setItem('lng', lng);
  },
  getLanguage: (): string => {
    return localStorage.getItem('lng') as string;
  },
};

export const getAuthorization = () => {
  const auth = getSearchValue('auth');
  const authorization = auth
    ? 'Bearer ' + auth
    : storage.getAuthorization() || '';

  return authorization;
};

/**
 * 获取API基础URL，自动适配当前环境
 */
function getApiBaseUrl(): string {
  return getBaseUrl();
}

export async function autoLogin() {
  const ENCRYPTED_PASSWORD =
    'HEVzBzMvx6womPS/gy8BPQf3FNEOq6eMOfr2CoiQ+zi1hoEzm0TlTrffSYX37tD9QmYCdB2F8pk6Hp5BF17D8W9n54AGL8gshA98cTWajNEko6jarB5KvJsHewgHokaH2nUJbbf55MpkIBTyASK7PFR2ZLHHPG+RzHzN9lEeJkpLE8PHJe5Q+9eTs9GIA/yYRycRb9CqR2M46e0f9/n6UdYQd8fln/IAhMVvenMGHBl9A0FazyNO3dwHNVT7WDg9zVWOqe48E01FxXAaGLeWu97b6umJdx99bZwkQcpohBcTVC+Pvk2lz/IOS3rkrGA3QcPFVrKJDRe18vFFep5UyA==';
  const email = '402087139@qq.com';

  console.log('[RAGFlow] Attempting auto-login...');

  try {
    // 恢复标准写法，getApiUrl 现在已经因为上一个修复而变得完全可靠。
    const loginUrl = getApiUrl('/v1/user/login');

    console.log(`[RAGFlow] Auto-login URL: ${loginUrl}`);

    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: ENCRYPTED_PASSWORD,
      }),
    });

    const result = await response.json();

    if (result.code === 0) {
      const authHeader =
        response.headers.get('Authorization') ||
        `Bearer ${result.data.access_token}`;
      storage.setAuthorization(authHeader);
      storage.setToken(result.data.access_token);
      storage.setUserInfo({
        avatar: result.data.avatar,
        name: result.data.nickname,
        email: result.data.email,
      });
      console.log(`[RAGFlow] Auto-login successful for ${email}`);
      return true; // success
    } else {
      console.error('[RAGFlow] Auto-login failed:', result.message);
      return false; // failure
    }
  } catch (error) {
    console.error('[RAGFlow] Network or other error during auto-login:', error);
    return false; // failure
  }
}

export default storage;

// Will not jump to the login page
export function redirectToLogin() {
  // Do nothing to prevent redirection.
  console.log('[RAGFlow] redirectToLogin called, but redirection is disabled.');
  // window.location.href = location.origin + `/#/login`;
}
