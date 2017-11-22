# Express常用API

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

## Response

`res`对象表示一个Express应用程序收到`HTTP`请求时发送的**HTTP响应**。

### res.render(view[,local][,callback])

呈现一个视图并将呈现的HTML字符串发送给客户端

```js
res.render('index');
```