# 初识Node.js

## Node.js三大特点

- **单线程**
- **非阻塞I/O**
- **事件驱动**

### 单线程

> 在Java、PHP或者.net等服务器端语言中，会为每一个客户端连接创建一个新的线程。
> 而每个线程需要耗费大约2MB内存。也就是说，理论上，
> 一个8GB内存的服务器可以同时连接的最大用户数为4000个左右。
> 要让Web应用程序支持更多的用户，就需要增加服务器的数量，而Web应用程序的硬件成本当然就上升了。

-----

> Node.js不为每个客户连接创建一个新的线程，而仅仅使用一个线程。
> 当有用户连接了，就触发一个内部事件，通过非阻塞I/O、事件驱动机制，
> 让Node.js程序宏观上也是并行的。使用Node.js，一个8GB内存的服务器，可以同时处理超过4万用户的连接。
> 另外，带线程的带来的好处，还有操作系统完全不再有线程创建、销毁的时间开销。

![多线程](http://owk6ztygn.bkt.clouddn.com/1.png)

![单线程](http://owk6ztygn.bkt.clouddn.com/2.png)

### 非阻塞I/O

当在访问数据库取得数据的时候，需要一段时间。
在传统的单线程处理机制中，在执行了访问数据库代码之后，整个线程都将暂停下来，等待数据库返回结果，
才能执行后面的代码。也就是说，**I/O阻塞了代码的执行，极大地降低了程序的执行效率。**

-----

由于Node.js中采用了非阻塞型I/O机制，因此在执行了访问数据库的代码之后，
将立即转而执行其后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序的执行效率。

当某个I/O执行完毕时，将以事件的形式通知执行I/O操作的线程，线程执行这个事件的回调函数。
为了处理异步I/O，线程必须有事件循环，不断的检查有没有未处理的事件，依次予以处理。

而非阻塞模式下，一个线程永远在执行计算操作，这个线程的CPU核心利用率永远是100%。

### 事件驱动

在Node中，客户端请求建立连接，提交数据等行为，会触发相应的事件。
在Node中，在一个时刻，只能执行一个事件回调函数，但是在执行一个事件回调函数的中途，
可以转而处理其他事件（比如，又有新用户连接了），然后返回继续执行原事件的回调函数，
这种处理机制，称为“事件环”机制。

![事件环机制](http://owk6ztygn.bkt.clouddn.com/3.png)

- **单线程**，单线程的好处，减少了内存开销，操作系统的内存换页。如果某一个事情，进入了，但是被I/O阻塞了，所以这个线程就阻塞了。

- **非阻塞I/O**， 不会傻等I/O语句结束，而会执行后面的语句。非阻塞就能解决问题了么？比如执行着小红的业务，执行过程中，小刚的I/O回调完成了，此时怎么办？？

- **事件驱动**，不管是新用户的请求，还是老用户的I/O完成，都将以事件方式加入事件环，等待调度。

## Node适合什么

善于I/O，不善于计算。因为Node.js最擅长的就是任务调度，如果你的业务有很多的CPU计算，实际上也相当于这个计算阻塞了这个单线程，就不适合Node开发。
当应用程序需要处理大量并发的I/O，而在向客户端发出响应之前，应用程序内部并不需要进行非常复杂的处理的时候，Node.js非常适合。Node.js也非常适合与web socket配合，开发长连接的实时交互应用程序。

-----

- 用户表单收集
- 考试系统
- 聊天室
- 图文直播
- 提供JSON的API（为前台Angular使用）

[将图片转换成字符画](http://www.degraeve.com/img2txt.php)

##  HTTP模块

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
}).listen(8000);
```

## `req`里面能够使用的东西。

**最关键的就是`req.url`属性，表示用户的请求`URL`地址。所有的路由设计，
都是通过`req.url`来实现的**

识别URL，用到两个新模块，第一个就是**url模块**，第二个就是**querystring模块**

### 重点介绍url模块
> 一个 URL 字符串是一个结构化的字符串，它包含多个有意义的组成部分。 当被解析时，会返回一个 URL 对象，它包含每个组成部分作为属性。

首先要引用`url`模块

```js
const url = require('url');
```

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

```js
var http = require("http");
var url = require("url");
var server = http.createServer(function(req,res){
    //url.parse()可以将一个完整的URL地址，分为很多部分：
    //host、port、pathname、path、query
    //不处理小图标
    if(req.url == "/favicon.ico") return;
    var myURL = url.parse(req.url);
    var pathname = myURL.pathname;
    var  search   = myURL.search ;
    var hash = myURL.hash;
    console.log("pathname-->" + pathname);
    console.log("search-->" +  search  );
    console.log("hash-->" +  hash  );
    res.end();
});
server.listen(3000,"127.0.0.1");
//pathname-->/s
//search-->?ie=UTF-8&wd=yourname
//hash-->null
```

> querystring模块不用

```js
querystring.parse('foo=bar&baz=qux&baz=quux&corge')
// returns
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
```

## `res`里面能够使用的东西。

> 首先看一看 `response.writeHead(statusCode[, statusMessage][, headers])`

- `statusCode`     `<number>`
- `statusMessage`     `<string>`
- `headers`     `<Object>`

> 发送一个响应头给请求。 状态码是一个三位数的 `HTTP` 状态码，如 `404`。 
> 最后一个参数 `headers` 是响应头。 第二个参数 `statusMessage` 是可选的状态描述。

**一般情况下会省略第二个参数也就是状态码描述**

```js
const http = require("http");
const server = http.createServer((req,res) =>{
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
    res.write("<h2>hello world</h2>")；
    res.end();
});
```

**注意点：**
- `res.write()`必须写在`res.writeHead()`之后
- 该方法在消息中只能被调用一次，且必须在 `response.end()` 被调用之前调用。

## fs (文件系统)

第一步还是引包

```js
var fs = require('fs');
```

### 读文件

```js
fs.readFile('./home/index.html',(err,data) =>{
        if ( err ) throw err ;
        res.end(data);
    });
```

### `fs.open(path, flags[, mode], callback)`

`flags` 可以是：
- 'r' - 以**读取模式**打开文件。如果文件不存在则发生异常。

- 'r+' - 以**读写模式**打开文件。如果文件不存在则发生异常。

- 'rs+' - 以**同步读写模式**打开文件。命令操作系统绕过本地文件系统缓存。

这对 NFS 挂载模式下打开文件很有用，因为它可以让你跳过潜在的旧本地缓存。 它对 I/O 的性能有明显的影响，所以除非需要，否则不要使用此标志。

注意，这不会使 `fs.open() `进入同步阻塞调用。 如果那是你想要的，则应该使用 `fs.openSync()`。

- 'w' - 以**写入模式**打开文件。文件会被创建（如果文件不存在）或截断（如果文件存在）。

- 'wx' - 类似 'w'，但如果 path 存在，则失败。

- 'w+' - 以**读写模式**打开文件。文件会被创建（如果文件不存在）或截断（如果文件存在）。

- 'wx+' - 类似 'w+'，但如果 path 存在，则失败。

- 'a' - 以**追加模式**打开文件。如果文件不存在，则会被创建。

- 'ax' - 类似于 'a'，但如果 path 存在，则失败。

- 'a+' - 以**读取和追加模式**打开文件。如果文件不存在，则会被创建。

- 'ax+' - 类似于 'a+'，但如果 path 存在，则失败。

```js
fs.open('<directory>', 'a+', (err, data) => {
  // => null, <data>
});
```
### 创建文件夹

```js
  fs.mkdir("./aaa");
```

### 检测文件状态

```js
    fs.stat(path, callback);
    // callback有两个参数一个是err 另一个是stats也就是fs.stats对象
    stats.isFile()  //检测是否是文件
    stats.isDirectory() //检测是否是文件夹

const http = require('http');
const fs = require('fs');
http.createServer((req,res) => {
    if(req.url == '/favicon.ico') return;
    fs.stat('./aaa.html',(err,data) =>{
        console.log(data.isDirectory());
    })
}).listen(8000);
```

### 读取文件目录

```js
fs.readdir(path[, options], callback);
```

回调有两个参数 `(err, files)`，其中 `files` 是目录中不包括 '`.`' 和 '`..`' 的文件名的数组。

```js
var http = require('http');
var fs = require('fs');
http.createServer((req,res) =>{
    if(req.url == "/favicon.ico") return;
    fs.readdir("./album/",function(err,files){
        var fileArr = [];
        (function iterator(i){
            if(i == files.length){
                console.log(fileArr);
                return;
            }
            fs.stat("./album/" + files[i],function(err,stats){
                //检测成功之后做的事情
                if(stats.isDirectory()){
                    //如果是文件夹，那么放入数组。不是，什么也不做。
                    fileArr.push(files[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
    res.end();
}).listen(8000);
```
