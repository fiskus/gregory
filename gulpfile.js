// vim: set softtabstop=4 shiftwidth=4 noexpandtab:

'use strict';

var gulp = require('gulp');

var fs = require('fs');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var envify = require('envify');
var jade = require('gulp-jade');

gulp.task('stylus', function() {
    gulp.src('./examples/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./examples/_build'));
});

gulp.task('watch-stylus', function () {
    gulp.watch('./styl/*.styl',
            ['stylus']);
});

gulp.task('js', function () {
    var exampleNames = ['single', 'triple', 'popup'];
    exampleNames.forEach(function(name) {
        browserify('./examples/' + name + '.js')
            .transform(envify)
            .bundle()
            .pipe(fs.createWriteStream('./examples/_build/' + name + '-bundle.js'));
    });
});

gulp.task('watch-js', function () {
    gulp.watch(['./lib/*.js', './examples/*.js'],
               ['js']);
});

gulp.task('watch', ['watch-stylus', 'watch-js']);

gulp.task('dev', ['stylus', 'js', 'watch']);

gulp.task('lint', function () {
    gulp.src('./lib/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('cs', function () {
    gulp.src('./lib/*.js')
        .pipe(jscs())
        .pipe(stylish.combineWithHintResults())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
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

gulp.task('build:bare', function () {
    browserify('./lib/external.js')
        .exclude('react')
        .exclude('moment')
        .transform(envify)
        .bundle()
        .pipe(fs.createWriteStream('./dist/gregory.js'));
});

gulp.task('build:full', function () {
    browserify('./lib/external.js')
        .transform(envify)
        .bundle()
        .pipe(fs.createWriteStream('./dist/gregory-react-moment.js'));
});

gulp.task('build', [
    'build:bare',
    'build:full'
]);

gulp.task('default', [
    'stylus',
    'js'
]);
