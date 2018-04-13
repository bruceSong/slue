require('./modules/a.less');
require('./modules/b.css');

var React = require('react');
console.log(React);

var modA = require('./modules/modA.js');
var modD = require('./modules/modD');

// slue-conf alain demo
var modC = require('components/modC');
modA.bar();
modC.bar();
//modC.bar();
exports.app = function() {
    console.log('test app');
}