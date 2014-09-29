var gulp = require('gulp'),

    jshint = require('gulp-jshint'),
    sass   = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('lint',function(){
	return gulp.src('js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('sass', function(){
	return gulp.src('scss/yemd.scss')
		.pipe(sass())
		.pipe(gulp.dest('css/'));
});

gulp.task('scripts',function(){
	return gulp.src('js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('watch',function(){
	gulp.watch('js/*.js',['lint', 'scripts']);
	gulp.watch('scss/*.scss', ['sass']);
});

gulp.task('default', ['lint', 'sass', 'scripts', 'watch'] );
