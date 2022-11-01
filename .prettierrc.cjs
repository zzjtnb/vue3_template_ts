module.exports = {
  useTabs: false, //是否使用tab缩进
  endOfLine: 'lf', //使用unix的换行符
  tabWidth: 2, //使用2个空格缩进
  printWidth: 500, //超过最180字符换行
  semi: true, //行尾需要有分号
  singleQuote: true, //使用单引号代替双引号
  jsxSingleQuote: true, //在jsx中使用单引号代替双引号
  bracketSpacing: false, //true: { foo: bar },false: {foo: bar}
  vueIndentScriptAndStyle: false, //vue文件中的script和style标签是否缩进
  htmlWhitespaceSensitivity: 'css', //设置html空格的敏感度
  trailingComma: 'all', //在对象或数组最后一个元素后面是否加逗号
  arrowParens: 'always', //箭头函数,只有一个参数的时候,也需要括号
  quoteProps: 'consistent', //设置对象属性的引号
  proseWrap: 'preserve', //Markdown使用默认的折行标准
};
