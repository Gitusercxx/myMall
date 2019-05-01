var fs = require('fs');
var confs = fs.readFileSync('./sever.conf').toString();
var conftemp = confs.split('\r\n');
var conf = {};
for(var i=0;i<conftemp.length;i++){
    var confarr = conftemp[i].split('=');
    conf[confarr[0]] = confarr[1];
}
module.exports = conf;

