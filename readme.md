# slue

前端构建工具，具有gulp的灵活性和webpack的模块化两大优点；
gulp基文件流特点使其在构建上具有很大灵活性，slue也是基于文件流的，提供了和gulp一样的API，gulp的所有插件都使用于slue；
webpack一切皆模块的思想给开发带来很大便利，但其本身不是一个很好的实现，API设计上存在存在缺陷；
模块化适合集中配置，gulp本身没有提供模块化机制，其碎片化的任务处理方式不太好写处理模块化的插件，对期扩展到是不错的注意，很遗憾，gulp不是我写的，所以我只能另起炉灶。

## slue-conf.js打包配置清单
```javascript
var path = require('path');
module.exports = {
    releaseto: './build',
    root: 'static/pkg/',// 静态文件在服务器上的根目录
    jsdir: '/js/',
    cssdir: '/css/',// 该值也为默认值
    imgdir: '/images/',

    /*
     * 该项配置把所有require到的css、less打包成一个文件
     * 如果没有该配置，一个pack配置对应该一个css包
     * 如下面的app.bound.js会有一个对应的app.bound.css
     */
    cssname: 'all.css',
    pack: {
        // key为编译后的包名，暂不支持路径
        // value为入口文件，要从根据目录写起，暂不支持glob
        'app.bound.js': ['./src/app.js'],
        'home.bound.js': ['./src/home.js']
    },
    // 路径配置
    alias: {
        components: path.join(__dirname, './components')
    }
};
```

## API

slue的基本用法和gulp一致，使用过gulp的话，上手slue是零成本的

`bound` 通用打包方法，返回一个长度为2的数组，分别为js和css的stream，会把多个包里的公共模块剥离到common

```javascript
var slue = require('slue');
var merge = require('merge-stream');
// 打包配置文件
var slueConfig = require('./slue-conf.js');
slue.task('build', function() {
    // slue.jsdir为js文件要发布到的目录
    // slue.cssdir为css文件要发布到的目录
    var map = ['jsdir', 'cssdir'];
    // streams为长度为2的数组，分别为js,css的stream;
    var streams = slue.bound(slueConfig).map(function(stream, i) {
        return stream.pipe(slue[map[i]]);
    });
    return merge(streams[0], streams[1]);
});
```
`jsBound` 打包js，返回js包的stream

```javascript
var js = slue.jsBound(slueConfig).pipe(slue.jsdir);
```
`commonJsBound` 打包公共js模块，返回公共js包的stream，该方法要先于jsBound调用

```javascript
var commonJs = slue.commonJsBound(slueConfig).pipe(slue.jsdir);
```
`cssBound` 打包css，返回css包的stream

```javascript
var css = slue.cssBound(slueConfig).pipe(slue.cssdir);
```
`commonCssBound` 打包公共css，返回公共css包的stream，该方法要先于cssBound调用

```javascript
var commonCss = slue.commonCssBound(slueConfig).pipe(slue.cssdir);
```