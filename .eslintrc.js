const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
    // node: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './build/webpack.base.config.js'),
      },
    },
  },
  plugins: ['vue'],
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
    'airbnb-base',
  ],
  rules: {
    'prefer-promise-reject-errors': 0,
    'import/extensions': 0,
    'vue/max-attributes-per-line': 0,
    'no-shadow': 0,
    'arrow-parens': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    // allow debugger during development
    'no-debugger': isProd ? 2 : 0,
    'no-console': isProd ? 2 : 0,
  },
};
