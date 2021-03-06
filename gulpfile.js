// vim: set sw=4 ts=4 expandtab:

'use strict';

var gulp = require('gulp');

var fs = require('fs');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var karma = require('karma').Server;
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var jade = require('gulp-pug');
var connect = require('gulp-connect');

gulp.task('stylus', function () {
    gulp.src('./examples/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./examples/_build'));
});

gulp.task('watch-stylus', function () {
    gulp.watch('./examples/*.styl',
            ['stylus']);
});

gulp.task('js', function () {
    var exampleNames = ['single', 'triple', 'popup'];
    exampleNames.forEach(function (name) {
        browserify('./examples/' + name + '.js')
            .bundle()
            .pipe(fs.createWriteStream(
                './examples/_build/' + name + '-bundle.js'));
    });
});

gulp.task('watch-js', function () {
    gulp.watch(['./lib/*.js', './examples/*.js'],
               ['js']);
});

gulp.task('watch', ['watch-stylus', 'watch-js']);

gulp.task('dev', ['stylus', 'js', 'watch']);

gulp.task('lint', function () {
    gulp.src(['./lib/*.js', './specs/*.js', './examples/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('cs', function () {
    gulp.src(['./lib/*.js', './specs/*.js', './examples/*.js'])
        .pipe(jscs())
        .pipe(stylish.combineWithHintResults())
        .pipe(jshint.reporter('default'));
});

gulp.task('specs', function (done) {
    var karmaServer = new karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
    karmaServer.start();
});

gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('jade', function () {
    gulp.src('./examples/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./examples/_build/'));
});

gulp.task('serve', function () {
    connect.server({
        port: 8888,
        root: './examples/_build'
    });
});

gulp.task('examples', [
    'stylus',
    'js',
    'jade',
    'serve'
]);

gulp.task('test', [
    'lint',
    'cs',
    'specs'
]);

gulp.task('default', [
    'stylus',
    'js',
    'jade'
]);
