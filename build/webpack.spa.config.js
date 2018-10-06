const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const rules = require('./loaders');

const htmlWebpackPluginOptions = {
  title: 'No-SSR tempalte',
  minify: true,
  template: path.resolve(__dirname, '../index.html'),
};

const config = merge.smart(base, {
  entry: {
    app: './src/entry-client.js',
  },
  module: {
    rules: [rules.cssLoader(), rules.scssLoader()],
  },
  plugins: [new ResourceHintWebpackPlugin(), new HtmlWebpackPlugin(htmlWebpackPluginOptions)],
});

module.exports = config;
