/**
 * 自定义格式化规则
 */
module.exports = {
  "*.{js,jsx,ts,tsx}": [
    // 使用eslint进行自动修复
    "eslint --fix",
    //使用prettier进行格式化
    "prettier --write",
  ],
  "*.{css,scss,less,postcss}": [
    //使用stylelint格式化css样式
    "stylelint --fix",
    // "stylelint --fix --custom-syntax stylelint-plugin-stylus/custom-syntax",
    //使用prettier进行格式化
    "prettier --write",
  ],
  //此处可以配置文件夹和文件类型的范围
  "*.vue": [
    // 使用eslint进行自动修复
    "eslint --fix",
    //使用stylelint格式化css样式
    "stylelint --fix",
    //使用prettier进行格式化
    "prettier --write",
  ],
};
