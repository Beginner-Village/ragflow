import storage from '@/utils/authorization-util';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook to handle session_key authentication from URL parameters
 * This ensures the page waits for the backend to set the cookie before proceeding
 */
export const useSessionKeyAuth = () => {
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const sessionKey = urlParams.get('session_key');

    if (sessionKey) {
      console.log('🔑 Processing session_key authentication...');

      // Store the session key temporarily in localStorage as backup
      // This ensures we don't lose authentication during navigation
      if (!storage.getAuthorization()) {
        storage.setAuthorization(sessionKey);
      }

      // The backend will handle the redirect, but we need to ensure
      // the page reloads after cookie is set
      setTimeout(() => {
        // Check if we're still on a URL with session_key
        // (means backend redirect didn't happen yet)
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.has('session_key')) {
          // Force a page reload to trigger backend middleware
          window.location.reload();
        }
      }, 100);
    }
  }, [location.search]);
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
