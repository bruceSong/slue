require('./modules/a.less');
require('./modules/b.css');

var str = "============================";

var modA = require('./modules/modA.js');

// slue-conf alain demo
var modC = require('components/modC');
modA.bar();
modC.bar();
exports.app = function() {
    console.log('test app');
}