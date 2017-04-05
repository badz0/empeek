'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');
var del = require('del');


gulp.task('serve', ['inject'], function () {
  browserSync.init({
    server: 'src'
  });
  browserSync.watch('src/**/*.*').on('change', function() {
      gulp.run('inject', 'copy');
      browserSync.reload();
  });
});

gulp.task('inject', function () {
    var injectStyles = gulp.src('src/content/**/*.css');

    var injectScripts = gulp.src([
        'src/app/**/app.module.js',
        'src/app/**/*.module.js',
        'src/app/**/*.js',
    ])
        .pipe(angularFilesort());

    var injectOptions = {
        ignorePath: ['src'],
        addRootSlash: true,
        order: ['**/app.module.js', '**/*.module.js', '**/*.js']
    };

    return gulp.src('src/index.html')
        .pipe(inject(injectStyles, injectOptions))
        .pipe(inject(injectScripts, injectOptions))
        .pipe(wiredep({ directory: 'src/bower_components'}))
        .pipe(gulp.dest('src'));
});
