var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-clean-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var tap = require('gulp-tap');
var Ractive = require('ractive');

// styles
gulp.task('css', function() {
  gulp.src('./less/styles.less')
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
   }))
  .pipe(gulp.dest('./static/css'))
  .pipe(minifyCSS({keepBreaks:true}))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./static/css'));
});

// scripts
gulp.task('js', function() {
  gulp.src('./js/app.js')
  .pipe(browserify())
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./static/js'))
});

// templates
gulp.task('templates', function() {
 gulp.src('./templates/**/*.html')
 .pipe(tap(function(file, t) {
   var precompiled = Ractive.parse(file.contents.toString());
   precompiled = JSON.stringify(precompiled);
   file.contents = new Buffer('module.exports = ' + precompiled);
 }))
 .pipe(rename(function(path) {
   path.extname = '.js';
 }))
 .pipe(gulp.dest('./templates'))
});


// watchers
gulp.task('watchers', function() {
  gulp.watch('less/**/*.less', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./templates/**/*.html', ['templates']);
});

// default task
gulp.task('default', ['css', 'templates', 'js', 'watchers']);
