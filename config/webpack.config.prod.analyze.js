let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const prodBuild = require('./webpack.config.prod.js');

module.exports = new Promise(resolve => {
  prodBuild.then(build => {
    build.plugins.push(new BundleAnalyzerPlugin());

    resolve(build);
  });
});
