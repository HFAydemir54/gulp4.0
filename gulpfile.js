const { watch, task, series, src, dest, parallel } = require('gulp');
var Fiber = require('fibers');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');


task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

task('sass', function() {
    return src('./assets/css/**/*.scss')
        .pipe(sass({ fiber: Fiber }).on('error', sass.logError))
        .pipe(dest('./dist/css'));
});

task('watch', function() {
    watch('./assets/css/**/*.scss', series(['sass']));
});

exports.default = parallel('browser-sync', 'watch');


//npm i -D gulp fibers gulp-sass browser-sync
//npm i