var http = require("http");
var server=http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html:charset=utf8"});
    res.end("hello world");
}).listen(3000);