import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 设置打包路径
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'api': fileURLToPath(new URL('./src/api', import.meta.url)),
      'config': fileURLToPath(new URL('./src/config', import.meta.url)),
      'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      'components': fileURLToPath(new URL('./src/components', import.meta.url)),
      'store': fileURLToPath(new URL('./src/store', import.meta.url)),
      'router': fileURLToPath(new URL('./src/router', import.meta.url)),
      'utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      'views': fileURLToPath(new URL('./src/views', import.meta.url)),
    }
  },
  css: {
    // https://github.com/vitejs/vite/issues/5833
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variable/index.scss" as *;`,
        // charset: false,//不起作用
      },
    },
  },
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: 3000,
    host: '0.0.0.0',
    cors: true, // 允许跨域
    // 本地跨域代理
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [vue(), vueJsx(), Inspect(),
  AutoImport({
    imports: [
      'vue',
      'vue-router',
      'vue-i18n',
      'pinia',
      {
        '@vueuse/core': ['useEventListener', 'tryOnUnmounted', 'useTimeoutFn', 'useDraggable', 'useResizeObserver', 'useWindowSize'],
      },
    ],
    // 可以选择auto-import.d.ts生成的位置,使用ts建议设置为'src/auto-import.d.ts'
    dts: 'types/auto-import.d.ts',
    // dts: false,
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    //用于搜索组件的目录的相对路径.
    dirs: ['src/components/auto', 'src/assets/svg'],
    //组件的有效文件扩展名
    extensions: ['vue', 'svg', 'js'],
    //搜索子目录
    deep: true,
    //指令的自动导入
    //默认值:Vue 3 的`true`,Vue 2 的`false`
    directives: true,
    //生成`components.d.ts` 全局声明文件
    dts: 'types/components.d.ts',
    // dts: false,
    //允许子目录作为组件的命名空间前缀
    directoryAsNamespace: false,
    // 忽略命名空间前缀的子目录路径
    // 当`directoryAsNamespace: true` 时有效
    globalNamespaces: [],
    //用于转换目标的过滤器
    include: [/\.vue$/, /\.vue\?vue/, /\.svg$/],
    // 忽略的文件
    // exclude: ['src/components/exclude'],
    // 自定义组件的解析器
    resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
  })],
  build: {
    // 如果设置为false,整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    cssCodeSplit: true,
    // 构建后是否生成 source map 文件.如果为 true,将会创建一个独立的 source map 文件
    sourcemap: false,
    // 设置最终构建的浏览器兼容目标.默认值是一个 Vite 特有的值--'modules'  还可设置为 'es2015' 'es2016'等
    target: 'modules',
    // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
    chunkSizeWarningLimit: 1000,
    // 单位字节(1024等于1kb) 小于此阈值的导入或引用资源将内联为 base64 编码,以避免额外的 http 请求.设置为 0 可以完全禁用此项.
    assetsInlineLimit: 4096,
    // 'terser' 相对较慢,但大多数情况下构建后的文件体积更小.'esbuild' 最小化混淆更快但构建后的文件相对更大.
    minify: 'terser',
    terserOptions: {
      compress: {
        // 生产环境去除console
        drop_console: true,
        // 生产环境去除debugger
        drop_debugger: true,
        // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        keep_infinity: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // 拆分代码
          vue: ['vue', 'vue-router', 'pinia'], // 如果打包有BUG请屏蔽
          'element-plus': ['element-plus'],
          // echarts: ['echarts'],
          // xlsx: ['xlsx'],
        },
      },
    },
  },
});
