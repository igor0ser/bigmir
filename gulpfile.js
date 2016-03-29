"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var open = require('gulp-open');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var prefixer = postcss([ 'autoprefixer' ]);

gulp.task('default', ['sprite', 'scss', 'open'], function(){
	gulp.watch( 'app/scss/**/*.scss', ['scss']);
});

gulp.task('scss', function () {
	gulp.src('app/scss/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer({
			browsers: 'last 2 versions, ie 8-11'
		})]))
		.pipe(gulp.dest('app/dist/'));
});

gulp.task('sprite', function() {
	var spriteData = 
		gulp.src('app/sprites/*.png') 
			.pipe(spritesmith({
				imgName: 'sprite.png',
				cssName: 'sprite.scss',
				cssFormat: 'scss',
				algorithm: 'top-down',
				cssVarMap: function (sprite) {sprite.name = 'sprite_' + sprite.name;}
			}));
	spriteData.img.pipe(gulp.dest('app/dist/')); 
	spriteData.css.pipe(gulp.dest('app/scss/')); 
});

gulp.task('open', function(){
	var options = {
		app: 'chrome',
		uri: "./app/index.html"
	};
	gulp.src('').pipe(open(options));
});


