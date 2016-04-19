var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-clean-css');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');


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

gulp.task('js', function() {
  gulp.src('./js/app.js')
  .pipe(browserify())
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('./static/js'))
});

gulp.task('watchers', function() {
  gulp.watch('less/**/*.less', ['css']);
  gulp.watch('./js/*.js', ['js']);
});

gulp.task('default', ['css', 'js', 'watchers']);
