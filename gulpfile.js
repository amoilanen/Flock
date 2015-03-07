var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var less = require('gulp-less');
var path = require('path');

var clientPaths = {
  styles: ['./styles/app.less'],
  js: ['./js/app.js']
};

gulp.task('clean', function(done) {
  del(['build'], done);
});

gulp.task('client-styles', function() {
  return gulp.src(clientPaths.styles)
    .pipe(less())
    .pipe(gulp.dest('./build/client/'));
});

//TODO: Also package the server code
//TODO: Minify the compiled client source code
//TODO: Add watch task so that build is rerun when something is changed
//TODO: Support for running tests for the app

gulp.task('client-browserify', function() {
  return browserify(clientPaths.js)
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/client/'));
});

gulp.task('default', ['client-browserify', 'client-styles']);