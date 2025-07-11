import DevInfo from '@/components/dev-info';
import ErrorBoundary from '@/components/error-boundary';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import i18n from '@/locales/config';
import { setupPdfWorker } from '@/utils/path-util';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App, ConfigProvider, ConfigProviderProps, theme } from 'antd';
import pt_BR from 'antd/lib/locale/pt_BR';
import deDE from 'antd/locale/de_DE';
import enUS from 'antd/locale/en_US';
import vi_VN from 'antd/locale/vi_VN';
import zhCN from 'antd/locale/zh_CN';
import zh_HK from 'antd/locale/zh_HK';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import weekday from 'dayjs/plugin/weekday';
import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './components/theme-provider';
import { SidebarProvider } from './components/ui/sidebar';
import { TooltipProvider } from './components/ui/tooltip';
import storage, { autoLogin } from './utils/authorization-util';

// 确保默认语言为中文
if (i18n.language !== 'zh') {
  i18n.changeLanguage('zh');
  localStorage.setItem('lng', 'zh');
}

export const qiankun = {
  async mount(props: any) {
    console.log('[agent-ynetflow] React app mount', props);

    // 从主应用接收 token 并设置
    if (props?.token) {
      console.log(
        '[agent-ynetflow] Received token from main app, setting authorization.',
      );
      storage.setAuthorization(props.token);
    } else if (process.env.NODE_ENV === 'development') {
      // 开发模式下，如果没有 token，设置一个模拟 token 以便独立调试
      const token = 'this-is-a-test-token-from-main-app';
      console.log(
        '[agent-ynetflow] Simulating token injection for development.',
        token,
      );
      storage.setAuthorization(`Bearer ${token}`);
    }
  },
  async bootstrap(props: any) {
    console.log('[agent-ynetflow] React app bootstraped', props);
  },
  async unmount(props: any) {
    console.log('[agent-ynetflow] React app unmount', props);
  },
  async update(props: any) {
    console.log('[agent-ynetflow] React app update', props);
  },
};

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

const AntLanguageMap = {
  en: enUS,
  zh: zhCN,
  'zh-TRADITIONAL': zh_HK,
  vi: vi_VN,
  'pt-BR': pt_BR,
  de: deDE,
};

if (
  process.env.NODE_ENV === 'development' &&
  process.env.DISABLE_DEV_INSPECTOR !== 'true'
) {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [],
    logOnDifferentValues: true,
  });
}

// 根据环境变量设置body属性来控制开发者工具显示
if (process.env.DISABLE_DEV_INSPECTOR === 'true') {
  document.body.setAttribute('data-disable-dev-inspector', 'true');
}

const queryClient = new QueryClient();

type Locale = ConfigProviderProps['locale'];

function Root({ children }: React.PropsWithChildren) {
  const { theme: themeragflow } = useTheme();
  const getLocale = (lng: string) =>
    AntLanguageMap[lng as keyof typeof AntLanguageMap] ?? enUS;

  const [locale, setLocal] = useState<Locale>(getLocale(storage.getLanguage()));

  i18n.on('languageChanged', function (lng: string) {
    storage.setLanguage(lng);
    setLocal(getLocale(lng));
  });

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: 'Inter',
          },
          algorithm:
            themeragflow === 'dark'
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
        locale={locale}
      >
        <SidebarProvider className="h-full">
          <ErrorBoundary>
            <App>{children}</App>
          </ErrorBoundary>
        </SidebarProvider>
        <Sonner position={'top-right'} expand richColors closeButton></Sonner>
        <Toaster />
        <DevInfo />
      </ConfigProvider>
      {/* <ReactQueryDevtools buttonPosition={'top-left'} /> */}
    </>
  );
}

const RootProvider = ({ children }: React.PropsWithChildren) => {
  useEffect(() => {
    // 独立开发或演示模式下，如果未登录，则执行自动登录
    if (
      (process.env.NODE_ENV === 'development' ||
        process.env.REACT_APP_AUTO_LOGIN === 'true') &&
      !window.__POWERED_BY_QIANKUN__ &&
      !storage.getAuthorization() // 关键修复：仅在未登录时执行
    ) {
      console.log(
        '[RAGFlow] Standalone/Demo mode detected (not logged in), attempting auto-login...',
      );
      autoLogin().then((success) => {
        if (success) {
          // 自动登录成功后，可以刷新页面或做其他操作来让应用状态更新
          // 这里我们选择重新加载页面，这是最简单有效的方式
          window.location.reload();
        }
      });
    }

    // Because the language is saved in the backend, a token is required to obtain the api. However, the login page cannot obtain the language through the getUserInfo api, so the language needs to be saved in localstorage.
    const lng = storage.getLanguage();
    if (lng) {
      i18n.changeLanguage(lng);
    }

    // 初始化 PDF Worker
    setupPdfWorker().catch(console.error);
  }, []);

  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="ragflow-ui-theme">
          <Root>{children}</Root>
        </ThemeProvider>
      </QueryClientProvider>
    </TooltipProvider>
  );
};

export function rootContainer(container: ReactNode) {
  return <RootProvider>{container}</RootProvider>;
}

// qiankun 配置已移动到独立文件 src/qiankun-config.ts
// 仅在微应用模式下会被加载
