const webpackMerge = require('webpack-merge');
const { VueLoaderPlugin } = require('vue-loader');
const rules = require('../build/loaders');

module.exports = webpackMerge({
  module: {
    rules: [rules.svgLoader(), rules.imagesLoader(), rules.scssLoader(), rules.cssLoader()]
  },
  resolve: rules.setupResolutions(),
  plugins: [new VueLoaderPlugin()]
});
