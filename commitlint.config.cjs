// commitlint.config.js
/*
 * @Description: commit-msg提交信息格式规范
 *
 * commit-msg格式: <type>(scope?): <subject>
 *  - type: 用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
 *    - build: 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
 *    - chore: 其他修改, 比如改变构建流程、或者增加依赖库、工具等
 *    - ci: 持续集成修改
 *    - docs: 仅文档新增/改动 （documentation）
 *    - feat: 新特性、新功能（feature）
 *    - fix: 修改bug（fixbug）
 *    - optimize: 优化构建工具或运行时性能
 *    - perf: 优化相关，比如提升性能、体验
 *    - refactor: 代码重构
 *    - revert: 回滚到上一个版本
 *    - style: 代码格式修改, 注意不是 css 修改
 *    - test: 测试用例修改
 *    - update: 更新某功能
 *  - scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
 *  - Subject：一句话描述此次提交的主要内容，做到言简意赅
 */
const type = [
  'add', // 添加依赖
  'delete', // 删除代码/文件
  'feat', //新功能(feature)
  'fix', //修补bug
  'merge', // 合并分支
  'perf', //性能提升
  'style', //格式(不影响代码运行的变动)
  'docs', //文档(documentation)
  'test', //增加测试
  'refactor', //重构（即不是新增功能，也不是修改bug的代码变动）
  'build', //影响系统构建或者外部依赖的更改(例如:glup,npm)
  'ci', //对CI配置文件和脚本的修改
  'chore', // 更改配置文件
  'revert', //代码回滚
  'release', // 发布
];

module.exports = {
  // ↓忽略包含init的提交消息
  ignores: [(commit) => commit.includes('init')],
  // ↓按照传统消息格式来验证
  extends: ['@commitlint/config-conventional'],
  // 自定义解析器
  parserPreset: {
    // 解析器配置
    parserOpts: {
      // commit 提交头的规则限制
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\(\（](.*)[\)\）])?[\:\：] (.*)/,
      // 匹配分组
      headerCorrespondence: ['type', 'subject'],
      // 引用
      referenceActions: ['close', 'closes', 'closed', 'fix', 'fixes', 'fixed', 'resolve', 'resolves', 'resolved'],
      // 对应issue要携带#符号
      issuePrefixes: ['#'],
      // 不兼容变更
      noteKeywords: ['BREAKING CHANGE'],
      fieldPattern: /^-(.*?)-$/,
      revertPattern: /^Revert\s"([\s\S]*)"\s*This reverts commit (\w*)\./,
      revertCorrespondence: ['header', 'hash'],
      warn() {}, // eslint-disable-line
      mergePattern: null,
      mergeCorrespondence: null,
    },
  },
  // ↓自定义提交消息规则(此处定义的任何规则都将覆盖来自@commitlint/config-conventional 的规则)
  rules: {
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
    // ↓type的类型
    'type-enum': [2, 'always', [...type]],
  },
  //失败时显示的自定义 URL
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
};
