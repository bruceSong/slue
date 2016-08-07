var slue = require('slue');
var merge = require('merge-stream');
var browserSync = require('browser-sync');
var slueConfig = require('./slue-conf.js');
slue.task('build', function() {
    // 可以分开用
    /*var commonJs = slue.commonJsBound(slueConfig).pipe(slue.jsdir);
    var commonCss = slue.commonCssBound(slueConfig).pipe(slue.cssdir);
    var js = slue.jsBound(slueConfig).pipe(slue.jsdir);
    var css = slue.cssBound(slueConfig).pipe(slue.cssdir);
    return merge(commonJs, commonCss, js, css);*/

    // 也可以综合调用，会剥离公共模块
    var map = ['jsdir', 'cssdir'];
    var streams = slue.bound(slueConfig).map(function(stream, i) {
        stream.pipe(slue[map[i]]);
    });
});

slue.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        port: 8080
    });
});

slue.task('reload', ['build'], function() {
    browserSync.reload();
});

slue.task('watch', function() {
    return slue.watch('./src/**').on('change', function(file) {
        slue.run('reload');
    })
});

slue.task('copy', ['build'], function() {
    return slue.src('./src/index.html').pipe(slue.dest('./build/'));
});

slue.task('default', ['copy'], function() {
    slue.run('watch');
    slue.run('server');
});