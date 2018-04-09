var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var header = require('gulp-header');
var gutil = require('gulp-util');
var path = require('path');
var pkg = require('./package.json');

const src = path.resolve(__dirname, './pages/**/*.less');
const dist = path.resolve(__dirname, './pages');

function swallowError (error) {
  gutil.log(error.message);
  this.emit('end')
}

gulp.task('less', ['less:pages', 'less:app']);

gulp.task('less:app', function () {
  return gulp.src(path.resolve(__dirname, './app.less'))
    .pipe(less({
      paths: [ path.resolve('./') ]
    }))
    .on('error', swallowError)
    .pipe(rename(function (path) {
      path.extname = ".wxss";
    }))
    .pipe(gulp.dest(path.resolve('./')));
});

gulp.task('less:pages', function () {
  return gulp.src(src)
    .pipe(less({
      paths: [ path.resolve('./') ]
    }))
    .on('error', swallowError)
    .pipe(rename(function (path) {
      path.extname = ".wxss";
    }))
    .pipe(gulp.dest(dist))
});

gulp.task('less:minify', function () {
  var comments = [
    '/*!',
    ' * BusinessCard v<%= pkg.version %>',
    ' * Copyright <%= new Date().getFullYear() %> black-widow',
    ' * Licensed under the <%= pkg.license %> license',
    ' */',
    ''
  ].join('\n');

  return gulp.src(src)
    .pipe(less({
      paths: [ path.resolve('./') ]
    }))
    .pipe(
      cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true }
      })
    )
    .pipe(header(comments, { pkg: pkg }))
    .pipe(rename(function (path) {
      path.extname = '.wxss';
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('less:dev', function () {
  gulp.watch(src, ['less:pages']);
  gulp.watch(path.resolve('./app.less'), ['less:app']);
});
