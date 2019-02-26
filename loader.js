
var globalConf = require("./conf.js");
var fs = require("fs");
var controller = [];
var webMap = new Map();
var webFile = fs.readdirSync(globalConf.web_path);
for(var i = 0; i < webFile.length; i++) {
    var tempMap = require("./" + globalConf.web_path + "/" + webFile[i]);
    if(!tempMap){
        continue;
    }
    for(var prop of tempMap) {
        if(webMap.has(prop[0])){
            throw new Error("web is repeated!");
        }else{
            webMap.set(prop[0], prop[1]);
        }
    }
    
}

module.exports = webMap;