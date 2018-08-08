const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { assetsPath } = require('../utils');

const isProd = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.resolve(__dirname, '..', dir);
}

exports.vueLoader = () => ({
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
          loaders: {
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
          },
        },
      },
    ],
  },
});

exports.fontsLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
});

exports.mediaLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
});

exports.imagesLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
});

exports.svgLoader = () => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [{ removeDimensions: true }, { removeViewBox: false }],
            name: assetsPath('svg/[name].[ext]'),
          },
        },
      },
    ],
  },
});

exports.babelLoader = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
});

exports.eslintLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('../src'), resolve('../test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
        },
      },
    ],
  },
});

exports.scssLoader = () => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
});

exports.cssLoader = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
});

exports.ScssCssLoader = () => ({
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { minimize: isProd },
          },
        ],
      },
    ],
  },
});

exports.setupResolutions = () => ({
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('../src'),
    },
  },
});
