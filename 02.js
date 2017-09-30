// require表示引包，引包就是引用自己的一个功能
var http = require("http");
var fs = require("fs");
// 创建服务器，参数是一个回调函数，表示如果有请求过来，要做什么
var server = http.createServer(function(req,res){
    if(req.url == '/test1'){
        fs.readFile("./index.html",function(err,data){
           
            res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
            res.end(data);
        });
    }else if(req.url == '/test2'){
        fs.readFile("./index2.html",function(err,data){
            
            res.writeHead(200,{"Content-type":"text/html;charset=utf8"});
            res.end(data);
        });
    }else if(req.url == '/0.jpg'){
        fs.readFile("./0.jpg",function(err,data){
            
            res.writeHead(200,{"Content-type":"image/jpg"});
            res.end(data);
        });
    }else if(req.url == '/css.css'){
        fs.readFile("./css.css",function(err,data){
            
            res.writeHead(200,{"Content-type":"text/css"});
            res.end(data);
        });
    }else{
        res.writeHead(404,{"Content-type":"text/html;charset=utf8"});
        res.end("すみません，你访问的页面不存在");
    }
    
}).listen(80);