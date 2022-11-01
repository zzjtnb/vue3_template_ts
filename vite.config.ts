import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// 图标
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
//自动导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';

import viteCompression from 'vite-plugin-compression';
import legacy from '@vitejs/plugin-legacy';

import Inspect from 'vite-plugin-inspect';

// 当前执行node命令时文件夹的地址(工作目录)
const root: string = process.cwd();

// import {resolve} from 'path';
// // 路径查找
// const pathResolve = (dir: string): string => {
//   return resolve(__dirname, '.', dir);
// };
// // 设置别名
// const alias: Record<string, string> = {
//   '@': pathResolve('src'),
//   //解决开发环境下的警告
//   'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
// };

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue()],
  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('./src', import.meta.url)),
  //   },
  // },
  base: './',
  root: root,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      //解决开发环境下的警告
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
      },
    },
  },
  // 服务端渲染
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: 3000,
    host: '0.0.0.0',
    // 本地跨域代理
    proxy: {
      '/api': {
        target: 'http://www.github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    vue(),
    Icons({
      autoInstall: true,
      // 缩放
      // Scale of icons against 1em
      scale: 1.2,
      // 编译方式
      // 'vue2', 'vue3', 'jsx'
      compiler: 'vue3',
      // 默认样式
      // Style apply to icons
      defaultStyle: '',
      // 默认类名
      // Class names apply to icons
      defaultClass: '',
    }),
    AutoImport({
      resolvers: [
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        ElementPlusResolver({importStyle: 'sass'}),
      ],
      imports: [
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        'vue',
        'vue-router',
        'vue-i18n',
        'pinia',
        {
          '@vueuse/core': ['useEventListener'],
        },
      ],
      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: [
        'src/hooks',
        // './composables' // only root modules
        // './composables/**', // all nested modules
        // ...
      ],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: 'types/auto-import.d.ts',
    }),
    Components({
      // ui库解析器，也可以自定义
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          // 自动引入的Icon组件统一前缀，默认为 i,设置false为不需要前缀
          prefix: 'icon',
          // {prefix}-{collection}-{icon} 使用组件解析器时,您必须遵循名称转换才能正确推断图标
          // alias: { park: 'icon-park' } 集合的别名
          // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
          enabledCollections: ['ep', 'noto'],
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver({importStyle: 'sass'}),
      ],
      //用于搜索组件的目录的相对路径。
      dirs: ['src/components/auto', 'src/assets/svg'],
      //组件的有效文件扩展名
      extensions: ['vue', 'svg', 'ts'],
      //搜索子目录
      deep: true,
      //生成`components.d.ts` 全局声明文件
      dts: 'types/components.d.ts',
      //指令的自动导入
      //默认值:Vue 3 的`true`,Vue 2 的`false`
      directives: true,
      //允许子目录作为组件的命名空间前缀
      directoryAsNamespace: false,
      // 忽略命名空间前缀的子目录路径
      // 当`directoryAsNamespace: true` 时有效
      globalNamespaces: [],
      //用于转换目标的过滤器
      include: [/\.vue$/, /\.vue\?vue/, /\.svg$/],
      exclude: ['src/components/exclude'],
    }),
    viteCompression(),
    // 是否为打包后的文件提供传统浏览器兼容性支持
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    // https://github.com/antfu/vite-plugin-inspect
    // Visit http://localhost:3000/__inspect/ to see the inspector
    Inspect(),
  ],
  optimizeDeps: {
    include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en'],
    exclude: [],
  },
  build: {
    sourcemap: false,
    // brotliSize: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 2000,
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  // 定义全局常量替换方式,其中每项在开发环境下会被定义在全局，而在构建时被静态替换
  define: {
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
});
