
var fs = require("fs");

var conf = fs.readFileSync("./server.conf").toString().split("\r\n");
var globalConf = {};

for(var i = 0; i < conf.length; i++){
    var temp = conf[i].split("=");
    if(temp.length > 1) {
        globalConf[temp[0]] = temp[1];
    }
}

if(globalConf.static_file_style){
    globalConf.static_file_style = globalConf.static_file_style.split("|");
}else {
    throw new Error("static_file_style is not found!");
}

module.exports = globalConf;