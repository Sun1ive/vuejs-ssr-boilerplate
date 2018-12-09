const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const isWin = process.platform === 'win32';

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve(__dirname, './build/webpack.base.config.js')
      }
    }
  },
  plugins: ['vue'],
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:vue/base',
    'plugin:vue/essential',
    'airbnb-base'
  ],
  rules: {
    'comma-dangle': 0,
    'prefer-promise-reject-errors': 0,
    'import/extensions': 0,
    'no-shadow': 0,
    'arrow-parens': 0,
    'linebreak-style': isWin ? 0 : 2,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'vue/max-attributes-per-line': 0,
    'vue/attribute-hyphenation': 0,
    // allow debugger during development
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.story.js']
      }
    ]
  }
};
