/**
 * 参考文档
 * 【Vue ESLint文档】 https://eslint.vuejs.org/
 * 【eslint英文文档】https://eslint.org/docs/user-guide/configuring
 * 【eslint中文文档】http://eslint.cn/docs/rules/
 */

/**
 * eslint有三种使用方式
 * 1.js代码中通过注释的方式使用
 * 2.通过webpack的eslintConfig字段设置,eslint会自动搜索项目的package.json文件中的配置
 * 3.通过配置文件的方式使用,配置文件有多种文件方式,如JavaScript、JSON 或者 YAML等
 */

/**
 * 文件忽略
 * 1.让eslint跳过特定文件的检测
 * 2.通过当前工作目录下 「.eslintignore」 文件进行设置
 * 3.其使用的是Glob路径书写方式,与「.gitignore」的使用方法相同
 * 4.也可以在 package.json 文件中,通过 eslintIgnore 参数进行设置
 */

/**
 * 文件内局部设置
 * eslint可以具体文件中设置特定代码的规则,常用于跳过某条语句的检测。
 * 1.注销全部规则,在代码前新建一行,添加注销 /* eslint-disable *\/ 如(果没有恢复设置的语句,则下列全部代码都会跳过检测)
 * 2.恢复eslint,在代码前新建一行,添加注销 /* eslint-enable *\/
 * 3.指定忽略的规则,/* eslint-disable no-alert, no-console *\/
 * 4.在特定行禁用,// eslint-disable-line
 * 5.在下一行禁用,// eslint-disable-next-line
 */

const {defineConfig} = require('eslint-define-config');
module.exports = defineConfig({
  /**
   * 根目录标识
   * http://eslint.cn/docs/user-guide/configuring#configuration-cascading-and-hierarchy
   * 默认情况下,ESLint 会在所有父级目录里寻找配置文件,一直到根目录.
   * 找到了配置之后则会与当前文件的配置进行合并,解析出最终的配置.
   * ESLint 一旦发现配置文件中有 "root": true,它就会停止在父级目录中寻找.
   */
  root: true, // 标识当前配置文件为eslint的根配置文件,让其停止在父级目录中继续寻找.
  /**
   * Parser(解析器)
   * 负责将输入代码转化为对应的抽象语法树(AST),并提供可选的遍历器(AST Visitors)以供ESLint调度
   * Eslint的规则(rules)体系建立在对AST的分析之上,从这点上来说,parser的作用举足轻重
   * http://eslint.cn/docs/user-guide/configuring#specifying-parser
   * 1.ESLint 默认使用Espree作为其解析器
   * 2.解析器必须是本地安装的一个 npm 模块,即必须按照在本地的node_module中.
   * 3.解析器是用于解析js代码的,怎么去理解每一个表达式,有点C++中编译器的概念,会对js进行一些语法分析.
   *   语义分析什么的,才能判断语句符不符合规范,而不是通过简单的字符串对比.
   * 4.解析器有很多,但兼容eslint的解析器有以下几个:
   *   Espree:默认解析器,一个从Esprima中分离出来的解析,做了一些优化.
   *   Esprima:js标准解析器.
   *   Babel-ESLint:一个对Babel解析器的包装,babel本身也是js解析器的一种(不然怎么能转化为兼容性代码呢？首先需要进行js解析,才能转化).
   *    如果我们的代码需要经过babel转化,则对应使用这个解析器.
   *   typescript-eslint-parser(实验):一个把 TypeScript 转换为 ESTree 兼容格式的解析器.
   * 5.但是通常在vue项目中,并不会写在 parser 字段中,而是写在 parserOptions -> parser.具体原因在 parserOptions 一栏中介绍
   */
  //处理Vue文件所需的parser,主要是处理一些Vue独有的AST节点,特别是处理template模块
  parser: 'vue-eslint-parser',
  /**
   * 解析器配置项
   * http://eslint.cn/docs/user-guide/configuring#specifying-parser-options
   * 这里设置的配置项将会传递到解析器中,被解析器获取到,进行一定的处理.
   * 具体被利用到,要看解析器的源码有没有对其进行利用.这里仅仅做了参数定义,做了规定,告诉解析器的开发者可能有这些参数
   */
  parserOptions: {
    /**
     * 这里出现 parser 的原因
     * 1.首先明确一点,官方说明中,parserOptions的配置参数是不包括 parser 的
     * 2.这里的写 parser 是 eslint-plugin-vue 的要求,是 eslint-plugin-vue 的自定义参数
     * 3.根据官方文档,eslint-plugin-vue 插件依赖 「vue-eslint-parser」解析器.
     * 「vue-eslint-parser」解析器,只解析 .vue 中html部分的内容,不会检测<script>中的JS内容.
     * 4.由于解析器只有一个,用了「vue-eslint-parser」就不能用「babel-eslint」.
     * 所以「vue-eslint-parser」的做法是,在解析器选项中,再传入一个解析器选项 parser.
     * 从而在内部处理「babel-eslint」,检测<script>中的js代码,所以这里出现了 parser.
     * 5.相关文档地址:https://eslint.vuejs.org/user-guide/#how-to-use-a-custom-parser
     */
    //eslint的解析器,用于解析ts,从而检查和规范ts代码
    parser: '@typescript-eslint/parser',
    // 指定JS代码来源的类型,script(script标签引入) | module(es6的module模块),默认为script.
    sourceType: 'module',
    // 支持的ES语法版本,默认为5.注意只是语法,不包括ES的全局变量,全局变量需要在env选项中进行定义.
    ecmaVersion: 'latest',
    // Features是特征的意思,表示你想使用的额外的语言特性,所有选项默认都是 false
    ecmaFeatures: {
      // 是否允许在全局作用域下使用 return 语句
      globalReturn: false,
      // 是否启用全局 strict 模式（严格模式）
      impliedStrict: false,
      // 是否启用JSX
      jsx: false,
      // 是否启用对实验性的objectRest/spreadProperties的支持
      experimentalObjectRestSpread: false, //对对象的扩展
    },
  },
  /**
   * 插件
   * http://eslint.cn/docs/user-guide/configuring#configuring-plugins
   * 1.插件同样需要在node_module中下载.
   * 2.注意插件名忽略了「eslint-plugin-」前缀,所以在package.json中,对应的项目名是「eslint-plugin-vue」
   * 3.插件的作用类似于解析器,用以扩展解析器的功能,用于检测非常规的js代码,也可能会新增一些特定的规则.
   * 4.如 eslint-plugin-vue,是为了帮助我们检测.vue文件中 <template> 和 <script> 中的js代码.
   */
  // plugins: ['vue'],

  /**
   * 规则继承(可以继承另外一个配置文件的所有特性,包括规则|插件|环境变量等)
   * http://eslint.cn/docs/user-guide/configuring#extending-configuration-files
   * 1.可继承的方式有以下几种
   * 2.eslint内置推荐规则,就只有一个,即「eslint:recommended」.
   * 3.可共享的配置是一个 npm 包,它输出一个配置对象,即通过npm安装到node_module中,
   *   可共享的配置可以省略包名的前缀 eslint-config-,即实际设置安装的包名是 airbnb-base.
   * 4.从插件中获取的规则,书写规则为 「plugin:插件包名/配置名」,
   *   其中插件报名也是可以忽略「eslint-plugin-」前缀,如'plugin:vue/vue3-recommended'.
   * 5.从配置文件中继承,即继承另外的一个配置文件,如'./node_modules/coding-standard/eslintDefaults.js'.
   */

  extends: [
    /**
     * vue 的额外添加的规则是 v-if, v-else 等指令检测
     * 额外添加的规则可查看 https://eslint.vuejs.org/rules/
     */
    // 'plugin:vue/vue3-essential',// 防止错误或意外行为的规则
    // 'plugin:vue/vue3-strongly-recommended',// 加上可显着提高代码可读性或开发体验的规则
    'plugin:vue/vue3-recommended', // 加上强制执行主观社区默认值以确保一致性的规则
    /**
     * TypeScript 的 ESLint 代码规则
     * 这是一个eslint插件,包含了各类定义好的检测ts代码的规范
     * https://typescript-eslint.io/docs/
     *
     */
    'plugin:@typescript-eslint/recommended',

    /**
     * 「airbnb,爱彼迎」
     *  1.有两种eslint规范,一种是自带了react插件的「eslint-config-airbnb」,一种是基础款「eslint-config-airbnb-base」.
     *  2.airbnb-base 包括了ES6的语法检测,需要依赖 「eslint-plugin-import」
     *  3.所以在使用airbnb-base时,需要用npm额外下载 eslint-plugin-import
     *  4.所以eslint实际上已经因为 airbnb-base 基础配置项目添加上了 eslint-plugin-import 插件配置
     *  5.所以在setting和rules里,都有 'import/xxx' 项目,这里修改的就是 eslint-plugin-import 配置
     */
    // 'airbnb-base',
    // 'plugin:import/typescript',
    /**
     * prettier
     * 用于 Prettier 格式的 ESLint 插件, 将prettier作为ESLint规范来使用
     * 确保把它放在最后,这样它就有机会覆盖其他配置
     * https://prettier.io/docs/en/install.html
     *它包含了 extends: ['prettier'], plugins: ['prettier']
     */
    'plugin:prettier/recommended',
  ],

  /**
   * 运行环境(预设的globals变量集合)
   * http://eslint.cn/docs/user-guide/configuring#specifying-environments
   * 1.一个环境定义了一组预定义的全局变量
   * 2.获得了特定环境的全局定义,就不会认为是开发定义的,跳过对其的定义检测,否则会被认为改变量未定义.
   * 3.常见的运行环境有以下这些,更多的可查看官网
   * https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments
   *   browser - 浏览器环境中的全局变量.
   *   node - Node.js 全局变量和 Node.js 作用域.
   *   es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性(该选项会自动设置 ecmaVersion 解析器选项为 6).
   *   amd - 将 require() 和 define() 定义为像 amd 一样的全局变量.
   *   commonjs - CommonJS 全局变量和 CommonJS 作用域(用于 Browserify/WebPack 打包的只在浏览器中运行的代码).
   *   jquery - jQuery 全局变量.
   *   mongo - MongoDB 全局变量.
   *   worker - Web Workers 全局变量.
   *   serviceworker - Service Worker 全局变量.
   */
  env: {
    browser: true,
    node: true,
  },
  /**
   * 全局变量
   * 定义一个全局变量类型,告诉eslint指定变量的解析方式:readonly|writable|off
   * http://eslint.cn/docs/user-guide/configuring#specifying-globals
   * 1.定义额外的全局,开发者自定义的全局变量,让其跳过 no-undef 规则.
   * 2.key值就是额外添加的全局变量.
   * 3.value值用于标识该变量能否被重写,类似于const的作用.true('writable')允许变量被重写,false('readonly')不允许重写变量.
   * 4.注意：要启用no-global-assign规则来禁止对只读的全局变量进行修改.
   */
  globals: {
    __DEV__: 'readonly', //例如定义 __DEV__ 这个全局变量,且这个变量不可以被重写
    // gTool: 'writable', // 例如定义 gTool 这个全局变量,且这个变量可以被重写
    // Promise: 'off', //禁用全局变量
  },
  /**
   * 规则共享参数
   * http://eslint.cn/docs/user-guide/configuring#adding-shared-settings
   * 【】提供给具体规则项,每个参数值,每个规则项都会被注入该变量,但对应规则而言,有没有用,就看各个规则的设置了,就好比 parserOptions,解析器用不用它就不知道了。这里只是提供这个方法
   * 【】不用怀疑,经源码验证,这就是传递给每个规则项的,会当做参数传递过去,但用不用,就是具体规则的事情
   */
  settings: {
    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx'],
    // },
    /**
     *
     * 注意,「import/resolver」并不是eslint规则项,与rules中的「import/extensions」不同。它不是规则项
     * 这里只是一个参数名,叫「import/resolver」,会传递给每个规则项。
     * settings并没有具体的书写规则,「import/」只是import模块自己起的名字,原则上,它直接命名为「resolver」也可以,加上「import」只是为了更好地区分。不是强制设置的。
     * 因为「import」插件很多规则项都用的这个配置项,所以并没有通过rules设置,而是通过settings共享
     * 具体使用方法可参考https://github.com/benmosher/eslint-plugin-import
     */
    'import/resolver': {
      /**
       * 这里传入webpack并不是import插件能识别webpack,而且通过npm安装了「eslint-import-resolver-webpack」,
       * 「import」插件通过「eslint-import-resolver-」+「webpack」找到该插件并使用,就能解析webpack配置项。使用里面的参数。
       * 主要是使用以下这些参数,共享给import规则,让其正确识别import路径
       * extensions: ['.js', '.vue', '.json'],
       * alias: {
       *  'vue$': 'vue/dist/vue.esm.js',
       *  '@': resolve('src'),
       *  'static': resolve('static')
       * }
       */
      // webpack: {
      //   config: 'build/webpack.base.conf.js',
      // },
      // 这个是解决引入时没后缀查不到的问题
      // node: {
      //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // },
    },
  },

  /**
   * 针对特定文件的配置
   * 1.可以通过overrides对特定文件进行特定的eslint检测
   * 2.特定文件的路径书写使用Glob格式,一个类似正则的路径规则,可以匹配不同的文件
   * 3.配置几乎与 ESLint 的其他配置相同。覆盖块可以包含常规配置中的除了 extends、overrides 和 root 之外的其他任何有效配置选项,
   */
  // overrides: [
  //   {
  //     // 匹配views和二级目录中的index.vue
  //     files: ['src/views/Index.vue', 'src/views/**/Index.vue'],
  //     rules: {
  //       'vue/multi-word-component-names': 'off',
  //     }, //给上面匹配的文件指定规则
  //   },
  // ],

  /**
   * 自定义规则
   * http://eslint.cn/docs/user-guide/configuring#configuring-rules
   * 1.基本使用方式
   *  off 或者 0 关闭规则
   *  warn 或者1 将规则打开为警告（不影响退出代码）
   *  error 或者2 将规则打开为错误（触发时退出代码为1）
   *  如：'no-restricted-syntax': 0, // 表示关闭该规则
   * 2.如果某项规则,有额外的选项,可以通过数组进行传递,而数组的第一位必须是错误级别。如0,1,2
   *  如 'semi': ['error', 'never'], never就是额外的配置项
   */
  rules: {
    /**
     * 具体规则
     * 1.具体的规则太多,就不做介绍了,有兴趣的同学可以上eslint官网查
     * 2.注意 xxx/aaa 这些规则是 xxx 插件自定的规则,在eslint官网是查不到的。需要到相应的插件官网中查阅
     * 3.如 import/extensions,这是「eslint-plugin-import」自定义的规则,需要到其官网查看 https://github.com/benmosher/eslint-plugin-import
     */

    // 'import/extensions': [
    //   // 这个是解决不写后缀报错的问题
    //   'error',
    //   'ignorePackages',
    //   {
    //     js: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //     json: 'never',
    //   },
    // ],

    // 打包时禁止debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 打包时禁止console
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 打包时禁止alert
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multi-word-component-names': 'off',
    // off
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
});
