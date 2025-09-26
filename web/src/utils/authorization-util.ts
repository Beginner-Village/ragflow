import { Authorization, Token, UserInfo } from '@/constants/authorization';
import { getSearchValue } from './common-util';
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

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export const getAuthorization = () => {
  const auth = getSearchValue('auth');
  const urlSessionKey = getSearchValue('session_key');

  // First, check if we have session_key in URL parameters (for SSO)
  if (urlSessionKey) {
    console.log('🔑 Detected session_key in URL, will be handled by backend');
    // The backend will handle setting the cookie and redirecting
    // We don't need to do anything here, but we could optionally
    // trigger a page reload after a short delay to ensure cookie is set
    return urlSessionKey;
  }

  // Then, check if we have URL auth parameter
  if (auth) {
    return 'Bearer ' + auth;
  }

  // Then, check for Coze session cookie
  const cozeSessionToken = getCookie('session_key');
  if (cozeSessionToken) {
    console.log('🍪 Using Coze session token for authentication');
    return cozeSessionToken;
  }

  // Finally, fall back to localStorage
  return storage.getAuthorization() || '';
};

export default storage;

// Will not jump to the login page
export function redirectToLogin() {
  window.location.href = location.origin + `/login`;
}
