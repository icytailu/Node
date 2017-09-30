//这个案例讲解http模块
var http = require("http");

var server = http.createServer(function(req,res){
    //req表示请求 res表示响应
}).listen(80);