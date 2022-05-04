module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-idiomatic-order'],
  rules: {
    'max-line-length': [120, { ignore: ['non-comments'] }],
    'scss/dollar-variable-pattern': [/^--/, { ignore: 'global' }],
  },
  overrides: [
    {
      files: ['**/*.(scss|css)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
};
