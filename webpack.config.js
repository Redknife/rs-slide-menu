const webpack = require('webpack');
const path = require('path');

const isDev = process.env.NODE_ENV === 'dev';

const outputFilename = isDev ? 'rs-slide-menu.js' : 'rs-slide-menu.min.js';

const plugins = [new webpack.NoErrorsPlugin()];

if (!isDev) {
  plugins.push(
    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      comments: false,
      compress: {
        warnings: false,
      },
    })
  );
}

const config = {
  entry: [
    path.join(__dirname, 'src/index.js'),
  ],

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFilename,
    publicPath: '/dist/',
    library: 'SlideMenu',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  plugins,

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_component)/,
        include: path.join(__dirname, 'src'),
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};

module.exports = config;
