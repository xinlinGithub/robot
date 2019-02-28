
var req = require("request");
var webMap = new Map();
var url = require("url");
function robot(request, response) {
    // get请求写法
    var params = url.parse(request.url,true).query
    if(params.text){
        var newdata = {//图灵机器人规定的数据格式
                "reqType":0,
                "perception": {
                    "inputText": {
                        "text": params.text
                    },
                },
                "userInfo": {
                    "apiKey": "371ad1ac3f914d62bbd9b329d7e34a3d",
                    "userId": "123456"
                }
            }
        var contents = JSON.stringify(newdata);
        req({
            url: "http://openapi.tuling123.com/openapi/api/v2",
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: contents
        },function(error, rep, body){
            if(!error && rep.statusCode == 200) {
                // 在后端进行跨域 不涉及浏览器 直接设置响应头 让浏览器可以访问所有域
                // 从后端跨域拿到他的数据 再发送到前端
                var head = {
                    "Access-Control-Allow-Origin": "*",//接受哪些域
                    "Access-Control-Allow-Methods": "get",//那种请求方式
                    "Access-Control-Allow-Headers": "x-request-with, content-type"//请求头字段
                }
                response.writeHead(200,head);//在这儿发送head所有的域都可以访问
                var objB = JSON.parse(body);
                if(objB && objB.results && objB.results[0] && objB.results[0].values){
                    //安全性检测 防止服务端报错 影响整体
                    //    console.log(objB.results[0]) 
                    response.write(JSON.stringify(objB.results[0].values));
                    response.end();
                }else{
                    response.write("{\"text\": \" 偶布吉岛你在说什么！\"}");
                    response.end();
                }
            }else{
                response.writeHead(404);
                response.write("<html><body><h1>404 not found!</h1></body></html>");
                response.end();
            }
        })
    }else{
        response.writeHead(404);
        response.write("<html><body><h1>404 not found!</h1></body></html>");
        response.end();
    }
    
    // 处理本地post请求
    // request.on("data", function(data) {//一定要注意 post请求的不同 需要监听data事件
    //     var dataArr = data.toString().split("&");
    //     var obj = {};
    //     for(var i = 0; i < dataArr.length ; i++) {
    //         var temp = dataArr[i].split("=");
    //         if(temp.length > 1) {
    //             obj[temp[0]] = temp[1];
    //         }
    //     }
    //      var newdata = {//图灵机器人规定的数据格式
    //         "reqType":0,
    //         "perception": {
    //             "inputText": {
    //                 "text": obj.text
    //             },
    //         },
    //         "userInfo": {
    //             "apiKey": "371ad1ac3f914d62bbd9b329d7e34a3d",
    //             "userId": "123456"
    //         }
    //     }
    //     var contents = JSON.stringify(newdata);
    //     req({
    //         url: "http://openapi.tuling123.com/openapi/api/v2",
    //         method: "post",
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //         body: contents
    //     },function(error, rep, body){
    //         if(!error && rep.statusCode == 200) {
    //             var head = {
    //                 "Access-Control-Allow-Origin": "*",//接受哪些域
    //                 "Access-Control-Allow-Methods": "post",//那种请求方式
    //                 "Access-Control-Allow-Headers": "x-request-with, content-type"//请求头字段
    //             }
    //             response.writeHead(200,head);//在这儿发送head所有的域都可以访问
    //             var objB = JSON.parse(body);
    //             if(objB && objB.results && objB.results[0] && objB.results[0].values){
    //                 //安全性检测 防止服务端报错 影响整体
    //             //    console.log(objB.results[0]) 
    //                 response.write(JSON.stringify(objB.results[0].values));
    //                 response.end();
    //             }else{
    //                 response.write("{\"text\": \" 偶布吉岛你在说什么！\"}");
    //                 response.end();
    //             }
    //         }else{
    //             response.writeHead(404);
    //             response.write("<html><body><h1>404 not found!</h1></body></html>");
    //             response.end();
    //         }
    //     })
        
    // })
    
}

webMap.set("/robot", robot);

function getData(request, response) {

}

webMap.set("/getData", getData);

module.exports = webMap;
