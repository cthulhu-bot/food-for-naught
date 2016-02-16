const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  entry: path.join(__dirname, '/src/main.js'),
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Food For Naught'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: "#source-map",
  watch: true,
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    devtool: 'eval-source-map',

    //Display only errors to reduce the amount of output
    stats: 'errors-only',

    //Parse host and port from env so this is easy to customize
    host: process.env.HOST,
    port: process.env.PORT
  }
};
