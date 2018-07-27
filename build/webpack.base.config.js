const path = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const rules = require('./loaders');

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(
  {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/dist/',
      filename: '[name].[chunkhash].js',
    },
    module: {
      noParse: /es6-promise\.js$/,
    },
    performance: {
      maxEntrypointSize: 300000,
      hints: isProd ? 'warning' : false,
    },
    plugins: isProd
      ? [new VueLoaderPlugin(), new MiniCssExtractPlugin({ filename: 'common.[chunkhash].css' })]
      : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()],
    optimization: {
      minimizer: isProd
        ? [
            new UglifyJsPlugin({
              parallel: true,
            }),
            new OptimizeCSSAssetsPlugin(),
          ]
        : [],
    },
  },
  rules.vueLoader(),
  rules.babelLoader(),
  rules.eslintLoader(),
  rules.svgLoader(),
  rules.imagesLoader(),
  rules.setupResolutions(),
  rules.scssLoader(),
);
