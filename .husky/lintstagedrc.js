/**
 * 自定义格式化规则
 */
module.exports = {
  //此处可以配置文件夹和文件类型的范围
  '*.{js,ts,cjs,vue}': [
    // 使用eslint进行自动修复
    'eslint --fix',
    //使用prettier进行格式化
    'prettier --write',
    //用于将自动修复后改变的文件添加到暂存区
    // 'git add --a',
  ],
  '*.{css,scss,vue}': [
    //使用stylelint格式化css样式
    'stylelint --fix',
    //使用prettier进行格式化
    'prettier --write',
    //用于将自动修复后改变的文件添加到暂存区
    // 'git add --a',
  ],
  '*.md': [
    'prettier --write',
    //用于将自动修复后改变的文件添加到暂存区
    // 'git add --a',
  ],
};
