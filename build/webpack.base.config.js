const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { assetsPath } = require('./utils');

const rules = require('./loaders');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: assetsPath('js/[name].[chunkhash:16].js')
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      rules.vueLoader(),
      rules.babelLoader(),
      rules.svgLoader(),
      rules.imagesLoader()
    ]
  },
  resolve: rules.setupResolutions(),
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  stats: {
    entrypoints: false,
    children: false
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({ filename: assetsPath('css/[name].[chunkhash].css') })
      ]
    : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()],
  optimization: {
    minimizer: isProd
      ? [
          new UglifyJsPlugin({
            cache: true,
            parallel: true
          }),
          new OptimizeCSSAssetsPlugin()
        ]
      : []
  }
};
