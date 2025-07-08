import authorizationUtil, { autoLogin } from '@/utils/authorization-util';
import { getSearchValue } from '@/utils/common-util';
import { message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'umi';

export const useOAuthCallback = () => {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const error = currentQueryParameters.get('error');
  const newQueryParameters: URLSearchParams = useMemo(
    () => new URLSearchParams(currentQueryParameters.toString()),
    [currentQueryParameters],
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      message.error(error);
      setTimeout(() => {
        navigate('/login');
        newQueryParameters.delete('error');
        setSearchParams(newQueryParameters);
      }, 1000);
      return;
    }

    const auth = currentQueryParameters.get('auth');
    if (auth) {
      authorizationUtil.setAuthorization(auth);
      newQueryParameters.delete('auth');
      setSearchParams(newQueryParameters);
      navigate('/knowledge');
    }
  }, [
    error,
    currentQueryParameters,
    newQueryParameters,
    navigate,
    setSearchParams,
  ]);

  console.debug(currentQueryParameters.get('auth'));
  return currentQueryParameters.get('auth');
};

export const useAuth = () => {
  const auth = useOAuthCallback();
  const [isLogin, setIsLogin] = useState<Nullable<boolean>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const authorization = authorizationUtil.getAuthorization();
      const hasAuth = !!authorization && authorization !== 'Bearer ';

      if (hasAuth) {
        setIsLogin(true);
        setIsLoading(false);
      } else {
        // No valid token, attempt to auto-login
        console.log('[useAuth] No token found, attempting auto-login...');
        const loginSuccess = await autoLogin();
        setIsLogin(loginSuccess);
        setIsLoading(false);
        if (!loginSuccess) {
          console.error(
            '[useAuth] Auto-login failed. The application will not be rendered.',
          );
        }
      }
    };

    // The auth from the URL (OAuth) should take precedence.
    const urlAuth = getSearchValue('auth');
    if (!urlAuth) {
      checkAuth();
    }
  }, [auth]);

  return { isLogin, isLoading };
};
