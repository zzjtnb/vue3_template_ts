module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-idiomatic-order'],
  rules: {
    'max-line-length': [120, {ignore: ['non-comments']}],
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
