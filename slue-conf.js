var path = require('path');
module.exports = {
    releaseto: './build',
    root: 'static/pkg/', // 静态文件在服务器上的根目录
    jsdir: '/js/',
    cssdir: '/css/', // 该值也为默认值
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
    externals: {
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter',
        'jQuery': 'jQuery'
    },
    // 路径配置
    alias: {
        components: path.join(__dirname, './components')
    }
};