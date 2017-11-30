const webpack = require('webpack');
const path = require('path');
const build = require('./util/buildInfo');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildInfo = require('./util/buildInfo');

const config = require('./config.json');

const ROOT_PATH = path.resolve(process.env.PWD);

const baseConfig = require('./webpack.config.base.js');

baseConfig.module.loaders.push({
  test: /\.s?css$/,
  loaders: [
    'style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
        includePaths: [
          path.join(__dirname, 'node_modules'),
          path.join(__dirname, 'app'),
          __dirname
        ]
      }
    }
  ]
});

const finalConfig = Object.assign({
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: "0.0.0.0",
    port: 8080,
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: config.applicationName,
      template: path.resolve(ROOT_PATH, 'app/src/templates/index.ejs'),
      filename: 'index.html',
      inject: false,
      cache: true
    })
  ]
}, baseConfig);

module.exports = new Promise(resolve => {
  buildInfo((build) => {
    finalConfig.plugins.unshift(new webpack.DefinePlugin({
      __DEV__: true,
      __BUILD__: JSON.stringify(build),
      __BUILD_EPOCH__: new Date().getTime(),
      SPOTIFY_CLIENT_ID: `'127e068ff068454a94a2dfcf217521f9'`,
      'process.env': {
        NODE_ENV: '"development"'
      }
    }));

    resolve(finalConfig);
  })
});
