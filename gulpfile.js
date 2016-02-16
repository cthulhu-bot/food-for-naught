"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Opens a url in a web browser
var reactify = require('reactify');
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint');
var webpack = require('webpack-stream');
var webpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');
var gulpWebpack = require('gulp-webpack');

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    dist: './dist',
    mainJs: './src/main.js',
    js: './src/**/*.js',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
    ]
  }
}

// Start a local dev server
gulp.task('connect', function() {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('webpack', function() {
  return gulp.src('src/*.js')
             .pipe(webpack(require('./webpack.config.js')))
             .pipe(gulp.dest('dist/'));
});

gulp.task('webpack-dev-server', function(callback) {
  var build = false;
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;
  var compiler = webpack(myConfig);
  var server = new webpackDevServer(compiler, {
    contentBase: '/dist',
    filename: 'bundle.js',
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: true,
    watchDelay: 300,
    publicPath: '/dist',
    headers: { 'X-Custom-Header': 'yes'},
    stats: { colors: true },
    historyApiFallback: false,
    proxy: {
      '*': 'http://localhost:9090'
    }
  });
  server.listen(8080, 'localhost', function(err) {
    browserSnc.reload();
    if(!built) {build = true; callback()}
  })
});

gulp.task('open', ['connect'], function() {
  gulp.src('dist/index.html')
      .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
      .transform(reactify)
      .bundle()
      .on('error', console.error.bind(console))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(config.paths.dist + '/scripts'))
      .pipe(connect.reload());
});

gulp.task('css', function() {
  gulp.src(config.paths.css)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
             .pipe(lint({config: 'eslint.config.json'}))
             .pipe(lint.format());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
});

//gulp.task('default', ['html', 'js', 'css', 'lint', 'open', 'watch']);
gulp.task('default', ['lint', 'webpack', 'watch']);
