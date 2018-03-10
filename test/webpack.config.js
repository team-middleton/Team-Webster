var path = require('path');
const webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/');
var DIST_DIR = path.join(__dirname, '/compiled');

module.exports = {
  entry: `reactComponentsTest.spec.js`,
  devServer: {
    hot: true,
    inline: true,
    port: 7700,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [ '.js', '.jsx'],
    alias: {
      'react': path.resolve(__dirname, './node_modules/', 'react')
    }
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  devtool: "source-map",
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : '/',
        loader : 'babel-loader',
        query: {
          presets: ['env','airbnb', 'react', 'es2015', 'stage-3']
       }
     }
    ]
  }
};
