/* eslint-env node */
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  root: true,
  extends: [
    'zzjtnb',
  ],
  ignorePatterns: [
    '!.commitlintrc.cjs',
    '!.stylelintrc.cjs',
    '!.eslintrc.cjs',
  ],
})
