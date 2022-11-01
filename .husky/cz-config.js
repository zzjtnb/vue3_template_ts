// config/.cz-config.js
module.exports = {
  types: [
    {value: 'feat', name: '✨feat:          增加新功能'},
    {value: 'fix', name: '🐛fix:           修复bug'},
    {value: 'docs', name: '📝docs:          修改文档'},
    {value: 'perf', name: '⚡perf:          性能优化'},
    {value: 'init', name: '🎉init:          初始提交'},
    {value: 'add', name: '➕add:           添加依赖'},
    {value: 'build', name: '🔨build:         打包'},
    {value: 'chore', name: '🔧chore:         更改配置文件'},
    {value: 'ci', name: '👷ci:            CI部署'},
    {value: 'del', name: '🔥del:           删除代码/文件'},
    {value: 'refactor', name: '♻refactor:       代码重构'},
    {value: 'revert', name: '⏪revert:        版本回退'},
    {value: 'release', name: '🔖release:        发布'},
    {value: 'style', name: '🎨style:         样式修改不影响逻辑'},
    {value: 'test', name: '✅test:          增删测试'},
  ],
  // scope 类型(定义之后，可通过上下键选择)
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['other', '其他修改'],
    // 如果选择 custom,后面会让你再输入一个自定义的 scope.也可以不设置此项,把后面的 allowCustomScopes 设置为 true
    ['custom', '以上都不是？我要自定义'],
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`,
    };
  }),
  messages: {
    type: '选择一种你的提交类型:\n',
    scope: '\n选择一个 scope(可选):',
    // 选择 scope: custom 时会出下面的提示
    customScope: '请输入自定义的 scope:',
    subject: '填写简短精炼的变更描述:\n',
    body: '填写更加详细的变更描述(可选) 使用 "|" 换行:\n',
    breaking: '列举非兼容性重大的变更(可选):\n',
    footer: '列举出所有变更的 ISSUES CLOSED(可选) 例如: #31, #34:\n',
    confirmCommit: '确认提交？',
  },
  // 是否允许自定义填写 scope,在 scope 选择的时候，会有 empty 和 custom 可以选择。
  allowCustomScopes: true,
  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],
  // 跳过要询问的步骤
  subjectLimit: 100,
  // skipQuestions: ['header', 'body', 'scope', 'breaking', 'footer'],
  // subject 限制长度,
  breaklineChar: '|', // 支持 body 和 footer
};
