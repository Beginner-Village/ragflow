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
  // 修复路径配置 - 根据微应用运行环境动态设置
  base: process.env.MICRO_APP === 'true' ? '/ragflow/' : '/',
  routes,
  // 修复publicPath配置
  publicPath: process.env.MICRO_APP === 'true' ? '/ragflow/' : '/',
  esbuildMinifyIIFE: true,
  icons: {},
  hash: true,
  favicons: [
    process.env.MICRO_APP === 'true' ? '/ragflow/logo.svg' : '/logo.svg',
  ],
  headScripts: [
    {
      src:
        process.env.MICRO_APP === 'true'
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
  // 仅在微应用模式下启用qiankun配置
  ...(process.env.MICRO_APP === 'true' && {
    qiankun: {
      slave: {
        devPort: 2080,
        entry: '//localhost:2080',
        // 指定独立的qiankun配置文件
        runtimeChunk: false,
      },
    },
  }),

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
