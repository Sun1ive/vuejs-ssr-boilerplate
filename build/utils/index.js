const path = require('path');
const config = require('../../config');

const isProd = process.env.NODE_ENV === 'production';

exports.assetsPath = function(_path) {
  const assetsSubDirectory = isProd
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};
