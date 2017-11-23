# Express常用API

## Application

### app.use

在匹配到一个网址的时候：后面做什么事情

```js
app.use([path,]function[,function...])
```

在路径上挂载一个中间件，如果什么都不写就代表`/`就是所有网址

```js
app.use(function(req,res,next){
    console.log(new Date());
    next();
})
```

## Request

`req`对象表示`HTTP`请求，并具有请求查询字符串、参数、主体、`HTTP`头等的属性。

### req.params

一个包含被映射到指定路径“参数”的属性的对象。如果有一个route `/user/:id`,那么，`id`属性就可以作为`req.params.id`提供。

```js
app.get('/user/:id',function(req,res){
    res.send('您的用户ID为：'+req.params.id);
});
// /user/9527
// 您的用户ID为：9527
```

### req.query

一个在路由中包含每个查询字符串参数的对象，如果没有查询的字符串就是一个空对象。

```js
app.get('/',function(req,res){
    console.log(req.query)
    res.send("<h1>小样~</h1>");
});
// http://localhost:8080/?id=2&sex=nan

//控制台输出：
{ id: '2', sex: 'nan'}

// GET /shoes?order=adidas&shoe[color]=blue&shoe[type]=converse
req.query.order
// => "adidas"

req.query.shoe.color
// => "blue"

req.query.shoe.type
// => "converse"
```

## Response

`res`对象表示一个Express应用程序收到`HTTP`请求时发送的**HTTP响应**。

### res.render(view[,local][,callback])

呈现一个视图并将呈现的HTML字符串发送给客户端

```js
res.render('index');
```

### res.status(code)

```js
res.status(404).sendFile('/absolute/path/to/404.png');
```

### res.set 设置HTTP头

```js
res.set('Content-Type','text/html;charset=utf8');
//多个参数用对象形式
res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
});
```