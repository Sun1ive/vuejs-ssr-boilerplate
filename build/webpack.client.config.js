const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const htmlWebpackPluginOptions = {
  title: 'No-SSR tempalte',
  minify: true,
  template: path.resolve(__dirname, '../index.html')
};

const config = merge.smart(base, {
  entry: {
    app: './src/entry-client.js'
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { minimize: isProd }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(htmlWebpackPluginOptions),

    new ResourceHintWebpackPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': JSON.stringify(process.env.CLIENT || 'client'),
      'process.browser': true,
      'process.client': true,
      'process.server': false
    }),

    new VueSSRClientPlugin()
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
          enforce: true
        },
        vendor: {
          name: 'vendor',
          test(module) {
            return /node_modules/.test(module.context) && !/\.css$/.test(module.request);
          }
        }
      }
    }
  }
});

module.exports = config;
