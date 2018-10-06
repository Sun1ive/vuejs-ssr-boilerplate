const webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const base = require('./webpack.base.config');
const rules = require('./loaders');

const config = merge.smart(base, {
  entry: {
    app: './src/entry-client.js',
  },
  module: {
    rules: [rules.cssLoader(), rules.scssLoader()],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': JSON.stringify(process.env.CLIENT || 'client'),
      'process.browser': true,
      'process.client': true,
      'process.server': false,
    }),

    new VueSSRClientPlugin(),
  ],
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
            return /node_modules/.test(module.context) && !/\.css$/.test(module.request);
          },
        },
      },
    },
  },
});

module.exports = config;
