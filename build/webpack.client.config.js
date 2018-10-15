const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const base = require('./webpack.base.config');
const rules = require('./loaders');

const htmlWebpackPluginOptions = {
  title: 'No-SSR tempalte',
  minify: true,
  template: path.resolve(__dirname, '../index.html'),
};

const plugins = [
  new HtmlWebpackPlugin(htmlWebpackPluginOptions),
  new ResourceHintWebpackPlugin(),
  new VueSSRClientPlugin(),
];

if (process.env.analyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

const config = merge.smart(base, {
  entry: {
    app: './src/entry-client.js',
  },
  module: {
    rules: [rules.cssLoader(), rules.scssLoader()],
  },
  plugins,
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendor: {
          name: 'vendor',
          test(module) {
            return (
              /node_modules/.test(module.context)
              && !/\.css$/.test(module.request)
            );
          },
        },
      },
    },
  },
});

module.exports = config;
