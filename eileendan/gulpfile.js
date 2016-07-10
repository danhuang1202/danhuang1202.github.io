const APP_DIR = 'app';
const DIST_DIR= 'dist';

var gulp = require('gulp'),
		$ = require('gulp-load-plugins')();

/*
 *	Optimize Javascript
 */

gulp.task('js', function(){
	return gulp.src([`${APP_DIR}/js/*.js`])
	.pipe($.jshint())
	.pipe($.jshint.reporter('default'))
	.on('error', $.notify.onError(
		function(error) {
			return "Gulp Error: " + error.message;
		}
	))
	.pipe($.concat('app.js'))
	.pipe(gulp.dest(`${DIST_DIR}/js/`));
});

/*
 *	Optimize CSS
 */

gulp.task('scss', function(){
	return gulp.src(`${APP_DIR}/scss/**/*.scss`)
	.pipe($.compass({
		sass: `${APP_DIR}/scss`,
		css: `${DIST_DIR}/css/`,
		style: 'compressed'
	}))
	.on('error', $.notify.onError(
		function(error) {
			return "Gulp Error: " + error.message;
		}
	))
	.pipe(gulp.dest(`${DIST_DIR}/css/`));
});

/*
 *	Optimize Image
 */

gulp.task('img', function(){
	return gulp.src(`${APP_DIR}/img/**/*`)
	.pipe($.imagemin({
			optimizationLevel: 3,
      progessive: true,
      interlaced: true
  }))
  .on('error', $.notify.onError(
		function(error) {
			return "Gulp Error: " + error.message;
		}
	))
	.pipe(gulp.dest(`${DIST_DIR}/img/`));
});

/*
 *	Default
 */

gulp.task('default', ['js', 'scss', 'img'], function(){
	gulp.watch('app/js/**/*.js', ['js']);
	gulp.watch('app/scss/**/*.scss', ['scss']);
	gulp.watch('app/img/**/*', ['img']);
});
