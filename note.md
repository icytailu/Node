# Node.js

## 1.require引包

## 2.读取文件

```js
//先要引包require("fs");
var fs = require("fs");
//fs有读取文件的模块
//有两个参数 err data data数据可以是html页面，json，txt，img
// text/html和charset=utf8之间是分号 ‘ ; ’
fs.readFire('./index.html',function(err,data){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
    res.end(data);
})
//每一次处理文件要读取文件数据的时候都应该有响应response
res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
re.end(data);
//每一次都要有res.end();不然服务器一直在刷新
```

## 3.url

url和物理文件没有关系

```js
if(res.url == '/music'){
    //可以看到用户输入的网址路径和文件真实的路径并不一样
    //这就是NodeJs可以把路由做的非常nice
    fs.readFire('./demo/center/music.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
        res.end(data);
    })
}
```

## 4.http模块

Node.js中，将很多功能划分成一个个模块
因为有一些程序需要读取文件功能(fs)有些不用，为了效率，需要什么就require什么

`http.createServer(<serverListener>)`
`serverListener`是函数类型
返回一个新建的 http.Server 实例。

**服务器的职责：**就是请求了什么，然后对请求的响应是什么
也就是`if(req.url == '/...'){res.end()}`之类的什么什么

```js
var http = require("http");
var server = http.cteateServer(function(req,res){
    if(req.url == '/music'){
        fs.readFile('./music.html',function(err,data){
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/html;charset=utf8'});
            res.end(data);
        })
    }
}).listen(80);
```