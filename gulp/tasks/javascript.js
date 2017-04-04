'use strict';

var gulp = require('gulp');
var pump = require('pump');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ignore = require('gulp-ignore');
var clean = require('gulp-clean');

gulp.task('javascript', function (cb) {
	pump([gulp.src([
			'src/js/vendor/**/*.js',
			'src/js/modules/**/*.js',
			'src/js/*.js'
		]),
		ignore.exclude('main.*'),
		sourcemaps.init(),
		concat('main.js'),
		sourcemaps.write('.'),
		gulp.dest('public'),
		ignore.exclude('*.map'),
		uglify(),
		rename('main.min.js'),
		gulp.dest('public')
	], cb);
});

