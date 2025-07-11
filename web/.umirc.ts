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
  // 根据微应用运行环境动态设置路径配置
  base: '/',
  routes,
  // 微应用模式下设置publicPath为动态路径，其他模式使用根路径
  publicPath: process.env.MICRO_APP === 'true' ? '/ynetflow/' : '/',
  esbuildMinifyIIFE: true,
  icons: {},
  hash: true,
  favicons: ['/logo.svg'],
  // 决定性修复 1: 开启 Umi 的 qiankun 微应用模式
  qiankun: {
    slave: {},
  },
  headScripts: [
    // 决定性修复 2: 移除了 set-public-path.js，但保留必要的 iconfont
    {
      src:
        process.env.MICRO_APP === 'true'
          ? '/ynetflow/iconfont.js'
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
  // 移除UMI qiankun插件，使用手动UMD配置

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
    '@umijs/plugins/dist/react-query',
    // 只在微应用模式下加载qiankun插件
    ...(process.env.MICRO_APP === 'true'
      ? ['@umijs/plugins/dist/qiankun']
      : []),
  ].filter(Boolean), // 过滤掉空值
  jsMinifier: process.env.NODE_ENV === 'production' ? 'none' : 'esbuild', // Fixed the issue that the page displayed an error after packaging lexical with terser
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
      target: 'http://10.10.10.225:9380',
      changeOrigin: true,
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    },
    // This rule must come first to handle prefixed paths in dev mode
    '/ynetflow/v1': {
      target: 'http://10.10.10.225:9380',
      changeOrigin: true,
      pathRewrite: { '^/ynetflow': '' },
      onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      },
    },
  },

  define: {
    'process.env.MICRO_APP': process.env.MICRO_APP,
    'process.env.REACT_APP_AUTO_LOGIN': process.env.REACT_APP_AUTO_LOGIN,
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
