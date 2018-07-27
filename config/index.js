const path = require('path');

module.exports = {
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'public',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  }
};
