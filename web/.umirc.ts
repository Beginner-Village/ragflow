import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { defineConfig } from 'umi';
import { appName } from './src/conf.json';
import routes from './src/routes';

export default defineConfig({
  title: appName,
  outputPath: 'dist',
  alias: { '@parent': path.resolve(__dirname, '../') },
  npmClient: 'npm',
  // 设置base路径以区分不同资源代理
  base: process.env.NODE_ENV === 'production' ? '/ragflow/' : '/',
  routes,
  // 设置publicPath以支持微应用
  publicPath: process.env.NODE_ENV === 'production' ? '/ragflow/' : '/',
  esbuildMinifyIIFE: true,
  icons: {},
  hash: true,
  favicons: [
    process.env.NODE_ENV === 'production' ? '/ragflow/logo.svg' : '/logo.svg',
  ],
  headScripts: [
    {
      src:
        process.env.NODE_ENV === 'production'
          ? '/ragflow/iconfont.js'
          : '/iconfont.js',
      defer: true,
    },
  ],
  clickToComponent: process.env.DISABLE_DEV_INSPECTOR === 'true' ? false : {},
  history: {
    type: 'hash',
  },
  // 暂时禁用 MFSU 来避免模块联邦错误
  mfsu: false,
  // 添加qiankun微应用配置
  qiankun: {
    slave: {
      // 微应用开发时的端口
      devPort: 2080,
      // 微应用的入口
      entry:
        process.env.NODE_ENV === 'production'
          ? '/ragflow/'
          : '//localhost:2080',
    },
  },

  runtimePublicPath: {},

  // 根据环境变量配置开发环境
  ...(process.env.NODE_ENV === 'development' && {
    // 开发环境特定配置
    fastRefresh: process.env.DISABLE_HOT_RELOAD !== 'true',
  }),
  plugins: [
    // 根据环境变量决定是否加载开发者工具
    ...(process.env.DISABLE_DEV_INSPECTOR !== 'true'
      ? ['@react-dev-inspector/umi4-plugin']
      : []),
    '@umijs/plugins/dist/tailwindcss',
    '@umijs/plugins/dist/qiankun',
  ],
  jsMinifier: 'none', // Fixed the issue that the page displayed an error after packaging lexical with terser
  lessLoader: {
    modifyVars: {
      hack: `true; @import "~@/less/index.less";`,
    },
  },
  // devtool 已移到上面的条件配置中
  copy: [
    { from: 'src/conf.json', to: 'dist/conf.json' },
    { from: 'node_modules/monaco-editor/min/vs/', to: 'dist/vs/' },
    { from: 'public/pdfjs-dist/', to: 'dist/pdfjs-dist/' },
  ],
  proxy: {
    '/v1': {
      target: 'http://ragflow_bk.luzhipeng.com',
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    },
  },

  chainWebpack(memo: any, args: any) {
    memo.module.rule('markdown').test(/\.md$/).type('asset/source');

    memo.optimization.minimizer('terser').use(TerserPlugin); // Fixed the issue that the page displayed an error after packaging lexical with terser

    // Add CORS headers for dev server
    memo.devServer.headers({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    });

    return memo;
  },
  tailwindcss: {},
});
