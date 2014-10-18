var gulp = require('gulp'),

    jshint = require('gulp-jshint'),
    sass   = require('gulp-ruby-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver');
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate');

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
	return gulp.src('app/scss/yemd.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css/'));
});

gulp.task('scripts',function(){
	return gulp.src(['app/js/*.js', 'app/js/**/*.js'])
		.pipe(concat('yemd.js'))
		.pipe(gulp.dest('dist/js/'))
		.pipe(rename('yemd.min.js'))
		.pipe(ngAnnotate())
		.pipe(uglify())
    .pipe(gulp.dest('dist/js'));
		//.pipe(uglify())
		//.pipe(gulp.dest('dist/js/'));
});

gulp.task('watch',function(){
	gulp.watch('app/js/*.js',['lint', 'scripts']);
	gulp.watch(['app/scss/*.scss', 'app/scss/**/*.scss'], ['sass']);
	gulp.watch('app/*.html');
});

gulp.task('default', ['webserver', 'lint', 'sass', 'scripts', 'watch'] );
gulp.task('build', ['webserver', 'lint', 'sass', 'scripts', 'watch'] );
