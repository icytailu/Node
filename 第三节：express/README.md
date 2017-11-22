# Express框架

> 基于Node.js平台，快速、开放、极简的web开发框架。

原生Node开发会遇到很多问题。比如：

- 呈递静态页面很不方便，需要处理每个HTTP请求，还要考虑304问题

- 路由处理代码不直观清晰，需要写很多正则表达式和字符串函数

- 不能集中精力写业务，要考虑很多其他的东西

## 整体感知Express框架~~~

- **路由能力**,正则提取数据能力足够一般工作使用
- **静态文件处理**，就是一句话
- **与模板引擎的配合**，直观清晰

```js
npm install --save express
```

引包：

```js
var express = require('express');
var app = express();
```

### 路由能力

根据客户端请求的不同的`url`分配到对应的处理结果。结构：

```js
app.METHOD(path,callback);
```

`METHOD` 是一个 `HTTP` 请求方法， `path` 是服务器上的路径， `callback` 是当路由匹配时要执行的函数。

基本路由示例：

```js
var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send("Hello World");
});

app.get(/^\/student\/([\d]{6})$/,function(req,res){
    res.send('学生信息，学号为：'+req.params[0]);
});

app.get('/teacher/:id',function(req,res){
    res.send('老是信息，ID为：'+req.params.id);
});
```

### 静态文件处理，也就一句话

```js
app.use(express,static('./public'));
```

### 与模板引擎配合

新建文件夹`views`存放`.ejs`文件:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <h2>Express 与模板引擎配合</h2>
    <ul>
        <% for(var i = 0; i < news.length; i++) {%>
            <li><%= news[i] %></li>
        <% } %>
    </ul>
</body>
</html>
```

首先记得安装`npm install ejs --save`

```js
const express = require('express');

const app = express();

app.set('view engine','ejs');

app.get('/test',function(req,res){
    res.render('test',{
        'news':['我是江小白','食戟之灵','一人之下']
    });
});
app.listen(9527);
```

## 路由

- 当用`get`请求访问一个网址的时候，做什么事情：

```js
app.get('/url',function(req,res){
    //do more
});
```

- 当用`post`访问一个网址的时候，做什么事情

```js
app.post('/url',function(req,res){
    //do more
});
```

- 如果想处理这个网址的任何`method`的请求，那么写`all`

```js
app.all("/",function(){
    // do more
});
```

- 网址不区分大小写：`/AAb`和`/aaB`是同一个地址

- 所有的GET参数，? 后面的都已经被忽略。 锚点#也被忽略

你路由到`/user` ， 实际/user?id=2&sex=nboy 也能被处理。

- 参数

```js
app.get('/student/:id',function(req,res){
    var id = req.params.id;
    var reg = /^[\d]{6}$/; //验证学号
    if(reg.test(id)){
        res.send('学号为：'+id);
    }else{
        res.send('格式错了~~~');
    }
})
```

- 表单可以自己提交到自己上。

```js
app.get("/form",function(req,res){
    res.render("form");
});
app.post("/form",function(req,res){
    //将数据添加进入数据库
    res.send("成功");
});
```

## 中间件（Middleware）

**中间件**是一个函数，它可以访问请求对象（req），响应对象（res），和web应用中处于**请求-响应** 循环流程中的中间件，一般命名为`next`的变量