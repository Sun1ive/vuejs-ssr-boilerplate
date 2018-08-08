const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { assetsPath } = require('../utils');

const isProd = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

exports.vueLoader = () => ({
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    compilerOptions: {
      preserveWhitespace: false
    }
  }
});

exports.fontsLoader = () => ({
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: assetsPath('fonts/[name].[hash:7].[ext]')
  }
});

exports.mediaLoader = () => ({
  test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: assetsPath('media/[name].[hash:7].[ext]')
  }
});

exports.imagesLoader = () => ({
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: assetsPath('img/[name].[hash:7].[ext]')
  }
});

exports.svgLoader = () => ({
  test: /\.svg$/,
  loader: 'vue-svg-loader',
  options: {
    svgo: {
      plugins: [{ removeDimensions: true }, { removeViewBox: false }],
      name: assetsPath('svg/[name].[ext]')
    }
  }
});

exports.babelLoader = () => ({
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: /node_modules/
});

exports.eslintLoader = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('../src'), resolve('../test')],
  options: {
    formatter: require('eslint-friendly-formatter')
  }
});

exports.scssLoader = () => ({
  test: /\.s(css)?$/,
  use: [
    !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { minimize: isProd }
    },
    'postcss-loader',
    'sass-loader'
  ]
});

exports.cssLoader = () => ({
  test: /\.css$/,
  use: [
    !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: { minimize: isProd }
    },
    'postcss-loader'
  ]
});

exports.serverSideCssLoaders = () => ({
  test: /\.(css|scss)$/,
  use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
});

exports.setupResolutions = () => ({
  extensions: ['.js', '.vue', '.scss', '.css'],
  alias: {
    vue$: 'vue/dist/vue.esm.js',
    '@': resolve('../src')
  }
});
