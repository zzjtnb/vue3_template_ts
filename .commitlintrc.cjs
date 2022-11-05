// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */

module.exports = {
  // ↓自定义提交消息规则
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    // ↓body上面要有换行
    'body-leading-blank': [2, 'always'],
    // ↓footer上面要有换行
    'footer-leading-blank': [1, 'always'],
    // ↓header的最大长度
    'header-max-length': [2, 'always', 108],
    // ↓subject不能为空 (默认)
    'subject-empty': [0, 'never'],
    // ↓type不能为空
    'type-empty': [2, 'never'],
  },
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: 'type:选择你要提交的类型 :',
      scope: 'scope:选择一个提交范围（可选）:',
      customScope: 'customScope:请输入自定义的提交范围 :',
      subject: 'subject:填写简短精炼的变更描述 :\n',
      body: 'body:填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: 'breaking:列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: 'footerPrefixsSelect:选择关联issue前缀（可选）:',
      customFooterPrefixs: 'customFooterPrefixs:输入自定义issue前缀 :',
      footer: 'footer:列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: 'confirmCommit:是否提交或修改commit ?',
    },
    // commit-msg格式: <type>(scope?): <subject>
    types: [
      { value: 'feat', name: 'feat:     ✨  新增功能 | A new feature', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛  修复缺陷 | A bug fix', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     📝  文档更新 | Documentation only changes', emoji: ':memo:' },
      { value: 'style', name: 'style:    💄  代码格式 | Changes that do not affect the meaning of the code', emoji: ':lipstick:' },
      { value: 'refactor', name: 'refactor: ♻️   代码重构 | A code change that neither fixes a bug nor adds a feature', emoji: ':recycle:' },
      { value: 'perf', name: 'perf:     ⚡️ 性能提升 | A code change that improves performance', emoji: ':zap:' },
      { value: 'test', name: 'test:     ✅ 测试相关 | Adding missing tests or correcting existing tests', emoji: ':white_check_mark:' },
      { value: 'build', name: 'build:    📦️ 构建相关 | Changes that affect the build system or external dependencies', emoji: ':package:' },
      { value: 'ci', name: 'ci:       🎡 持续集成 | Changes to our CI configuration files and scripts', emoji: ':ferris_wheel:' },
      { value: 'init', name: 'init:   🎉 初始提交 | Frist Commit', emoji: ':tada:' },
      { value: 'chore', name: 'chore:    🔨 其他修改 | Other changes that don\'t modify src or test files', emoji: ':hammer:' },
      { value: 'revert', name: 'revert:   ⏪️ 回退代码 | Reverts a previous commit', emoji: ':rewind:' },
    ],
    useEmoji: true,
    emojiAlign: 'center',
    themeColorCode: '',
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: '以上都不是？我要自定义',
    emptyScopesAlias: '跳过',
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [
      // 如果使用 gitee 作为开发管理
      { value: 'link', name: 'link:     链接 ISSUES 进行中' },
      { value: 'closed', name: 'closed:   标记 ISSUES 已完成' },
    ],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: '跳过',
    customIssuePrefixsAlias: '自定义前缀',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
    helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  },
}
