module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-idiomatic-order',
    // stylelint-config-prettier-scss应该放在后面,才能覆盖前面的配置.
    // 而且既能验证 css 文件也能验证 sass 文件.
    'stylelint-config-prettier-scss',
  ],
  //需要忽略的文件
  ignoreFiles: ['./src/assets/styles/element/element-variables.scss'],
  rules: {},
};
