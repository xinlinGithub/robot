var http = require("http");
var url = require("url");
var fs = require("fs");
var globalConf = require("./conf");
var loader = require("./loader");

var server = http.createServer(function(request, response) {
    console.log("服务器已启动")
    var pathName = url.parse(request.url).pathname;
    if(isStaticFile(pathName)){
        try{
            var data = fs.readFileSync(globalConf.page_path + pathName);
            response.writeHead(200);
            response.write(data);
            response.end();
        }catch(e) {
            response.writeHead(404);
            response.write("<html><body><h1>404 not found!</h1></body></html>");
            response.end();
        }
    }else{
        // console.log(loader,pathName)
        if(loader.has(pathName)){
            try{
                loader.get(pathName)(request, response);
            }catch(e){
                response.writeHead(500);
                response.write("<html><body><h1>500 Bad server!</h1></body></html>");
                response.end();
            }
        }else{
            response.writeHead(404);
            response.write("<html><body><h1>404 not found!</h1></body></html>");
            response.end();
        }
    }
}).listen(globalConf.port);

function isStaticFile(pathName) {
    for(var i = 0; i < globalConf.static_file_style.length; i++) {
        if(pathName.indexOf(globalConf.static_file_style[i]) == pathName.length - globalConf.static_file_style[i].length){
            return true;
        }
    }
    return false;
}