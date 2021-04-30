const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  module: {

  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'index.html'),
          to: path.resolve(__dirname, 'build'),
        },
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'build'),
        },
      ],
    }),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },
};