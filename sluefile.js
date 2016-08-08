var slue = require('slue');
var merge = require('merge-stream');
var browserSync = require('browser-sync');
var slueConfig = require('./slue-conf.js');
slue.task('build', function() {
    // slue.jsdir为js文件要发布到的目录
    // slue.cssdir为css文件要发布到的目录
    var map = ['jsdir', 'cssdir'];
    // streams为长度为2的数组，分别为js,css的stream;
    // slueConfig为打包配置文件
    var streams = slue.bound(slueConfig).map(function(stream, i) {
        return stream.pipe(slue[map[i]]);
    });
    return merge(streams[0], streams[1]);
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