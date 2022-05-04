module.exports = {
  /**
   * env:提供预定义的环境变量.
   * 因为node 或者浏览器中的全局变量很多,如果我们一个个声明会显得繁琐.
   * 因此就需要用到env,这是对环境定义的一组全局变量的预设.
   */
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  /**
   * extends:使用预设的 lint 包
   * 如果要我们自己去设置各个规则未免会显得繁琐,所以可以直接使用业界的最佳实践
   */
  extends: [
    // eslint推荐的规则
    // 'eslint:recommended',
    // Priority A: Essential (Error Prevention)
    'plugin:vue/vue3-essential',
    //Priority B: Strongly Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    // 'plugin:vue/vue3-strongly-recommended',
    //Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead)
    // 'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  /**
   * parser:指定要使用的解析器.
   * 我们指定为vue-eslint-parser即可
   */
  parser: 'vue-eslint-parser',
  /**
   * parserOptions:给解析器传入一些其他的配置参数
   * 比如我们之前安装的@typescript-eslint/parser就可以在这里进行配置
   */
  parserOptions: {
    ecmaVersion: 'latest', // 支持的es版本
    // parser: '@typescript-eslint/parser',
    parser: {
      // Script parser for `<script>`
      js: 'espree',
      // Script parser for `<script lang="ts">`
      ts: '@typescript-eslint/parser',
      // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
      // and vue interpolations (e.g. `{{variable}}`).
      // If not specified, the parser determined by `<script lang ="...">` is used.
      '<template>': 'espree',
    },
    sourceType: 'module', // 代模块类型,默认为script,我们设置为module
  },
  // plugins:增强 ESlint 功能
  // 还记得我们最开始安装的@typescript-eslint/eslint-plugin吗?
  // 它就是用来给 eslint 提供一些额外的适用于 ts 语法的规则,插件名中的 eslint-plugin可以省略
  plugins: ['vue', '@typescript-eslint'],
  // rules:创建自定义规则.
  // 规则列表:eslint-plugin-vue(https://eslint.vuejs.org/rules)
  // 规则定义值:
  // off 或 0 - 关闭规则
  // warn 或 1 - 开启规则, 使用警告 程序不会退出
  // error 或 2 - 开启规则, 使用错误 程序退出
  rules: {
    // override/add rules settings here, such as:
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
  },
};
