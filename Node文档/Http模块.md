# HTTP模块

Node.js中，将很多的功能，划分为了一个个mudule，大陆的书翻译为模块；台湾的书，翻译为模组。
这是因为，有一些程序需要使用fs功能（文件读取功能），有一些不用的，所以为了效率，你用啥，你就require啥。

**服务器的职责：**就是请求了什么，然后对请求的响应是什么
也就是`if(req.url == '/...'){res.end()}`之类的什么什么

```js
var http = require("http");
var fs = require("fs");
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

## req里面能够使用的东西。

**最关键的就是`req.url`属性，表示用户的请求`URL`地址。所有的路由设计，都是通过`req.url`来实现的**

识别URL，用到两个新模块，第一个就是**url模块**，第二个就是**querystring模块**

```js
querystring.parse('foo=bar&baz=qux&baz=quux&corge')
// returns
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
```