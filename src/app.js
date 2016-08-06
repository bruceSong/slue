// less demo
require('./modules/a.less');

// css demo
require('./modules/b.css');

// js demo
var modA = require('./modules/modA.js');
var modB = require('./modules/modB');

// json demo
var commonMap = require('./common.json');
console.log(commonMap);

// html demo
var index = require('../index.html');
console.log(index);

// jade demo 暂不支持
/*var o = {
    user: {
        description: '我喜欢猫'
    }
};
var md = require('./modules/md.jade');
console.log(md(o));*/

modA.bar();
modB.bar();
exports.app = function() {
    console.log('test app');
}