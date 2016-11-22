webpack = require('webpack'),
  gutil = require('gulp-util');

webpackConfig = module.exports = {
  // entry: './ls/App.ls',
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  output: {
    path: '',
    filename: 'app.js'
  },
  externals: {
    'PIXI': 'PIXI',
    'TweenLite': 'TweenLite',
    'fastclick': 'fastclick',
    'i18next': 'i18next',
    'gamelib': 'gamelib'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.png$/, loader: 'url-loader?limit=100000&mimetype=image/png' },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  }
};

var isProduction = gutil.env.prod ? true : false;

if (isProduction) {
  webpackConfig.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      outSourceMap: false,
      mangle: false,
      compress: {
        drop_console: true
      }
    })
  ];
}