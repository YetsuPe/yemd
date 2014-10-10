var gulp = require('gulp'),

    jshint = require('gulp-jshint'),
    sass   = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver');
    rename = require('gulp-rename');

gulp.task('webserver', function() {
  gulp.src('app')
  	.pipe(webserver({
  		livereload: true,
  		open: true
  	}));
});

gulp.task('lint',function(){
	return gulp.src('app/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function(){
	return gulp.src('app/scss/style.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css/'));
});

gulp.task('scripts',function(){
	return gulp.src('app/js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch',function(){
	gulp.watch('app/js/*.js',['lint', 'scripts']);
	gulp.watch('app/scss/*.scss', ['sass']);
	gulp.watch('app/*.html');
});

gulp.task('default', ['webserver', 'lint', 'sass', 'scripts', 'watch'] );
