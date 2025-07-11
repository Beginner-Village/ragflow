import { Authorization } from '@/constants/authorization';
import { ResponseType } from '@/interfaces/database/base';
import i18n from '@/locales/config';
import authorizationUtil, {
  getAuthorization,
} from '@/utils/authorization-util';
import { convertTheKeysOfTheObjectToSnake } from '@/utils/common-util';
import { getApiPrefix } from '@/utils/path-util';
import { message, notification } from 'antd';
import type { RequestMethod } from 'umi-request';
import { extend } from 'umi-request';

const redirectToLogin = () => {
  const currentPath = window.location.pathname + window.location.search;
  const loginPath = currentPath.includes('/ynetflow')
    ? '/ynetflow/#/login'
    : '/#/login';
  window.location.href = loginPath;
};

const FAILED_TO_FETCH = 'Failed to fetch';

const RetcodeMessage: Record<number, string> = {
  200: i18n.t('message.200'),
  400: i18n.t('message.400'),
  401: i18n.t('message.401'),
  403: i18n.t('message.403'),
  404: i18n.t('message.404'),
  406: i18n.t('message.406'),
  410: i18n.t('message.410'),
  413: i18n.t('message.413'),
  422: i18n.t('message.422'),
  500: i18n.t('message.500'),
  502: i18n.t('message.502'),
  503: i18n.t('message.503'),
  504: i18n.t('message.504'),
};

type ResultCode =
  | 200
  | 201
  | 202
  | 204
  | 400
  | 401
  | 403
  | 404
  | 406
  | 410
  | 413
  | 422
  | 500
  | 502
  | 503
  | 504;

const errorHandler = (error: {
  response: Response;
  message: string;
}): Response => {
  const { response } = error;
  if (error.message === FAILED_TO_FETCH) {
    notification.error({
      description: i18n.t('message.networkAnomalyDescription'),
      message: i18n.t('message.networkAnomaly'),
    });
  } else {
    if (response && response.status) {
      const errorText =
        RetcodeMessage[response.status as ResultCode] || response.statusText;
      const { status, url } = response;
      notification.error({
        message: `${i18n.t('message.requestError')} ${status}: ${url}`,
        description: errorText,
      });
    }
  }
  return response ?? { data: { code: 1999 } };
};

const request: RequestMethod = extend({
  errorHandler,
  timeout: 300000,
  getResponse: true,
});

// 防止重复注册拦截器
let interceptorsRegistered = false;

// 创建一个重试函数来处理401错误
async function handleRetryRequest(
  originalUrl: string,
  originalOptions: any,
): Promise<any> {
  console.log('[Request] Starting retry process for:', originalUrl);

  try {
    // 尝试自动登录
    const { autoLogin } = await import('@/utils/authorization-util');
    const loginSuccess = await autoLogin();

    if (loginSuccess) {
      console.log(
        '[Request] Auto-login successful, retrying original request...',
      );

      // 重新发起原始请求，标记为重试
      const retryResponse = await request(originalUrl, {
        ...originalOptions,
        __isRetry: true, // 标记为重试请求
        headers: {
          ...originalOptions.headers,
          [Authorization]: getAuthorization(), // 使用新的token
        },
      });

      console.log('[Request] Retry successful');
      return retryResponse;
    } else {
      console.error('[Request] Auto-login failed');
      redirectToLogin();
      throw new Error('Auto-login failed');
    }
  } catch (error) {
    console.error('[Request] Error during retry:', error);
    redirectToLogin();
    throw error;
  }
}

function setupRequestInterceptors() {
  if (interceptorsRegistered) {
    console.log('[Request] 拦截器已注册，跳过重复注册');
    return;
  }

  request.interceptors.request.use((url: string, options: any) => {
    const data = convertTheKeysOfTheObjectToSnake(options.data);
    const params = convertTheKeysOfTheObjectToSnake(options.params);

    let finalUrl = url;
    const apiPrefix = getApiPrefix();
    // Prefix the API url in micro-app mode.
    if (apiPrefix && !url.startsWith('http')) {
      finalUrl = `${apiPrefix}${url}`;
    }

    return {
      url: finalUrl,
      options: {
        ...options,
        data,
        params,
        __url: url, // 保存原始URL用于重试
        headers: {
          ...(options.skipToken
            ? undefined
            : { [Authorization]: getAuthorization() }),
          ...options.headers,
        },
        interceptors: true,
      },
    };
  });

  request.interceptors.response.use(async (response: Response, options) => {
    if (response?.status === 413 || response?.status === 504) {
      message.error(RetcodeMessage[response?.status as ResultCode]);
    }

    if (options.responseType === 'blob') {
      return response;
    }

    const data: ResponseType = await response?.clone()?.json();
    if (data?.code === 100) {
      message.error(data?.message);
    } else if (data?.code === 401) {
      // 检查是否是重试请求，避免无限循环
      if (options.__isRetry) {
        console.log('[Request] Retry request also got 401, stopping retry');
        authorizationUtil.removeAll();
        redirectToLogin();
        throw new Error('Authentication failed after retry');
      }

      console.log('[Request] 401 detected, starting retry process...');
      authorizationUtil.removeAll();

      // 获取原始请求URL
      const originalUrl = (options as any).__url;

      // 执行重试逻辑，返回重试后的响应
      // 这样前端就收不到401错误，而是直接收到重试后的正确响应
      return await handleRetryRequest(originalUrl, options);
    } else if (data?.code !== 0) {
      notification.error({
        message: `${i18n.t('message.hint')} : ${data?.code}`,
        description: data?.message,
        duration: 3,
      });
    }
    return response;
  });

  interceptorsRegistered = true;
  console.log('[Request] 拦截器注册完成');
}

// 清理请求拦截器
export function clearRequestInterceptors() {
  if (interceptorsRegistered) {
    // 注意：umi-request 可能没有直接的清理方法，我们通过标记来避免重复注册
    interceptorsRegistered = false;
    console.log('[Request] 拦截器状态已重置');
  }
}

// 初始化时注册拦截器
setupRequestInterceptors();

export { request as default };

export const get = (url: string) => {
  return request.get(url);
};

export const post = (url: string, body: any) => {
  return request.post(url, { data: body });
};

export const drop = () => {};

export const put = () => {};
