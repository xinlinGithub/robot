

var msg = document.getElementById("msg");
var wrap = document.getElementsByClassName("wrap")[0];
var clear = document.getElementsByClassName("clear")[0];
var header = document.getElementsByClassName("header")[0];
var msgBox = document.getElementsByClassName("msgBox")[0];
var robot = document.getElementsByClassName("robot")[0];


clearMsg();
function clearMsg() {
    clear.addEventListener("mousedown", function (e) {
        var l = this.offsetLeft;
        var t = this.offsetTop;
        var lw = e.clientX - l;
        var th = e.clientY - t;
        var ww = robot.offsetWidth;
        var wh = robot.offsetHeight;
        var cw = clear.offsetWidth;
        var ch = clear.offsetHeight;
        var hh = header.offsetHeight;
        var mh = msgBox.offsetHeight;
        var move = function(e) {//clear还默认向左平移了自身一半！！
            var left = e.clientX -lw;
            var top = e.clientY - th;
            if(left >= cw / 2 && left <= ww - cw / 2 && top >= hh && top <= wh - mh - ch) {
                clear.style.left = left + "px";
                clear.style.top = top + "px";
            }
        }
        document.addEventListener("mousemove", move)
        document.addEventListener("mouseup", function(e) {
            document.removeEventListener("mousemove",move);
            if(l == clear.offsetLeft && t == clear.offsetTop && e.target == clear){
                wrap.innerHTML = "";                
            }
        })
    })
}
function sendMsg() {
    var val = msg.value;
    if(val == ""){
        return;
    }
    // 显示本用户的所输入的消息
    appendMsg("user", val);
    msg.value = "";

    var xhr = new XMLHttpRequest();
    function text() {
        // 在这里面不能直接向图灵机器人发送数据 因为这样会跨域 浏览器会拒绝请求
        // 可以自己写一个代理服务器 让自己的服务器向图灵机器人请求 这样就不涉及到浏览器
        // 就不存在跨域问题
        // var data = {
        //     "reqType":0,
        //     "perception": {
        //         "inputText": {
        //             "text": val
        //         },
        //     },
        //     "userInfo": {
        //         "apiKey": "371ad1ac3f914d62bbd9b329d7e34a3d",
        //         "userId": "123456"
        //     }
        // }
    }
    
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200){
            appendMsg("retMsg", JSON.parse(xhr.responseText).text);
        }
    }
    var data = "text=" + val;
    // 访问线上的网址 可以访问任何的域 
    // 相当于在别的地方就可以访问自己的服务器 
    // 自己的服务进行get请求跨域处理
    // 就不用直接访问问自己的服务地址了
    xhr.open("get", "http://127.0.0.1:12306/robot?" + data, true);
    xhr.send();

    // post请求 只能直接访问本地服务器 不能在外部访问 因为网址的访问方式为get请求
    // xhr.open("post", "/robot",true);
    // xhr.send(data);
}

function appendMsg(name,val) {
    var div = document.createElement("div");
    div.className = name;
    if(name == "user"){
        div.innerHTML = `
            <p>${val}</p>
            <div class="imgWrap">
                <img src="./img/qn.jpg" alt="#">
            </div>
        `;
    }else if(name == "retMsg"){
        div.innerHTML = `
            <div class="imgWrap">
                <img src="./img/f2.jpg" alt="#">
            </div>
            <p>${val}</p>
        `;
    }
    wrap.appendChild(div);
    setScroll();
}
function setScroll() {
    if(wrap.scroll) {
        wrap.scrollTop = wrap.scrollHeight;
    }
}

msg.onkeydown = function (e) {
    if(e.keyCode === 13) {
        sendMsg();
    }
}