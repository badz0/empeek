var gulp = require('gulp');
var server = require('gulp-server-livereload');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var csso = require('gulp-csso');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cleanDest = require('gulp-clean-dest');


//SERVER	
gulp.task('serv', function() {
  gulp.src('./app')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: true
    }));
});

//STYLES
gulp.task('styles', function () {
  return gulp.src('./app/sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix({
		browsers: ['last 15 versions'],
		cascade: false
	}))
    .pipe(gulp.dest('./app/css'));
});

//IMAGES
gulp.task('images', function () {
    return gulp.src('./app/img/**/*')
        .pipe(imagemin({
          progressive: true
        }))
        .pipe(gulp.dest('public/img'));
});
//views
gulp.task('views', function () {
    return gulp.src('./app/views/**/*.html')
        .pipe(gulp.dest('public/views'));
});
//BUILD
gulp.task('build', ['images', 'views'] ,function () {
    return gulp.src('./app/*.html')
        .pipe(cleanDest('public'))
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', csso()))
        .pipe(gulp.dest('public'));
});

//watchers
gulp.task('watch', function () {
	gulp.watch('./app/sass/**/*.sass', ['styles']);
});

gulp.task('default', ['serv', 'watch']);