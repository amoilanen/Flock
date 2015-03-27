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
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var gulpSequence = require('gulp-sequence');

var clientPaths = {
  styles: ['./styles/app.less'],
  js: ['./js/app.js']
};

var serverPaths = {
  js: ['./server/*.js']
};

gulp.task('clean', function(done) {
  del(['build/server/client/*'], {force: true}, done);
});

gulp.task('build-client', ['client-browserify'], function() {
  return gulp.src('./build/dev/client/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build/server/client/'));
});

gulp.task('client-browserify', function() {
  return browserify(clientPaths.js)
    .transform(reactify, {'es6': true})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/dev/client/'));
});

gulp.task('build-styles', ['client-compile-less'], function() {
  return gulp.src('./build/dev/client/app.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/server/client/'))
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
    .pipe(jshint({"esnext": true}))
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('js/**/*.js', ['build-client']);
  gulp.watch('styles/**/*.js', ['build-styles']);
});

gulp.task('copy-resources',
  ['copy-font-awesome', 'copy-font-frosting', 'copy-css', 'move-index-file'], function() {
  return gulp.src(['fonts/**/*'])
    .pipe(gulp.dest('./build/server/client/fonts'));
});

gulp.task('copy-font-awesome', function() {
  return gulp.src(['node_modules/font-awesome/**/*'])
    .pipe(gulp.dest('./build/server/client/fonts/font-awesome'));
});

gulp.task('copy-font-frosting', function() {
  return gulp.src(['fonts/**/*'])
    .pipe(gulp.dest('./build/server/client/fonts'));
});

gulp.task('copy-css', function() {
  return gulp.src(['build/dev/client/app.css'])
    .pipe(gulp.dest('./build/server/client'));
});

gulp.task('move-index-file', function() {
  return gulp.src(['index.built.html'])
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./build/server/client'));
});

gulp.task('test', ['jest']);

gulp.task('jest', function() {
   return gulp.src('.')
     .pipe(shell('npm test'));
});

gulp.task('default', gulpSequence(
  'test',
  'lint',
  'clean',
  'build-styles',
  'copy-resources',
  'build-client',
  'build-server'
));

gulp.task('dev', gulpSequence(
  'watch',
  'build-styles',
  'build-client'
));