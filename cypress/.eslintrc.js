const path = require('path');

module.exports = {
  plugins: ['cypress', 'mocha'],
  env: {
    'cypress/globals': true,
  },
  rules: {
    'mocha/no-mocha-arrows': 'error',
    'mocha/no-identical-title': 'error',
    'mocha/no-exclusive-tests': 'error',
    'no-console': 'off',
    'prefer-arrow-callback': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  parserOptions: {
    project: path.join(__dirname, '../tsconfig.json'),
  },
};
