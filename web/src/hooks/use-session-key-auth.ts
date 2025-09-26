import storage from '@/utils/authorization-util';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Hook to handle session_key authentication from URL parameters
 * This ensures the page waits for the backend to set the cookie before proceeding
 */
export const useSessionKeyAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sessionKey = urlParams.get('session_key');

    if (sessionKey) {
      console.log('🔑 Processing session_key authentication...');

      // Immediately store the session key in localStorage
      // This ensures authentication persists across navigation
      storage.setAuthorization(sessionKey);

      // Set cookie directly in the browser
      document.cookie = `session_key=${sessionKey}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;

      console.log('✅ Session key saved to localStorage and cookie');

      // Remove session_key from URL to clean it up
      const newParams = new URLSearchParams(location.search);
      newParams.delete('session_key');

      // Navigate to the clean URL
      const newSearch = newParams.toString();
      const newUrl = newSearch
        ? `${location.pathname}?${newSearch}`
        : location.pathname;

      // Use replace to avoid adding to history
      navigate(newUrl, { replace: true });

      console.log('🔄 Redirected to clean URL:', newUrl);
    }
  }, [location.search, location.pathname, navigate]);
};

// Helper function to check if session is valid
export const checkSessionValidity = () => {
  // Get cookie value
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  };

  const sessionCookie = getCookie('session_key');
  const localAuth = storage.getAuthorization();

  // If we have a session cookie, ensure localStorage is synced
  if (sessionCookie && sessionCookie !== localAuth) {
    console.log('📝 Syncing session_key to localStorage');
    storage.setAuthorization(sessionCookie);
  }

  return sessionCookie || localAuth;
};

export default useSessionKeyAuth;
