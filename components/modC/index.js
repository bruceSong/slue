var modB = require('./modB.js');
modB.bar();
exports.bar = function() {
    console.log('test modC');
}