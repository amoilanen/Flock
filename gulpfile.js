var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var path = require('path');

var clientPaths = {
  styles: ['./styles/app.less'],
  js: ['./js/app.js']
};

var serverPaths = {
  js: ['./server/*.js']
};

gulp.task('clean', function(done) {
  del(['build/client/*'], {force: true}, done);
});

gulp.task('build-client', ['client-browserify'], function() {
  return gulp.src('./build/dev/client/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/client/'));
});

gulp.task('client-browserify', function() {
  return browserify(clientPaths.js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/dev/client/'));
});

gulp.task('build-styles', ['client-compile-less'], function() {
  return gulp.src('./build/dev/client/app.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/client/'))
});

gulp.task('client-compile-less', function() {
  return gulp.src(clientPaths.styles)
    .pipe(less())
    .pipe(gulp.dest('./build/dev/client/'));
});

gulp.task('build-server', function() {
  return gulp.src(serverPaths.js)
    .pipe(gulp.dest('./build/server/'));
});

gulp.task('lint', function() {
  return gulp.src(['./js/**/*.js', './server/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['build-client']);
  gulp.watch('server/**/*.js', ['build-server']);
  gulp.watch('styles/**/*.js', ['build-styles']);
});

//TODO: Copy resources (fonts, CSS) to the built packages as well
//TODO: Add watch task so that build is rerun when something is changed

//TODO: Support for running tests for the app

gulp.task('default', ['lint', 'clean', 'build-client', 'build-server', 'watch']);