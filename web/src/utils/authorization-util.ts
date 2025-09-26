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
  // 1. First check localStorage (most reliable after initial setup)
  const storedAuth = storage.getAuthorization();
  if (storedAuth) {
    console.log('📦 Using stored authorization');
    return storedAuth;
  }

  // 2. Check for Coze session cookie
  const cozeSessionToken = getCookie('session_key');
  if (cozeSessionToken) {
    console.log('🍪 Using Coze session token from cookie');
    // Also save to localStorage for persistence
    storage.setAuthorization(cozeSessionToken);
    return cozeSessionToken;
  }

  // 3. Check URL parameters (for initial SSO)
  const urlSessionKey = getSearchValue('session_key');
  if (urlSessionKey) {
    console.log('🔑 Using session_key from URL');
    // Save to localStorage immediately
    storage.setAuthorization(urlSessionKey);
    return urlSessionKey;
  }

  // 4. Check for auth parameter (legacy support)
  const auth = getSearchValue('auth');
  if (auth) {
    return 'Bearer ' + auth;
  }

  // No authentication found
  return '';
};

export default storage;

// Will not jump to the login page
export function redirectToLogin() {
  window.location.href = location.origin + `/login`;
}
