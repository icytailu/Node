const express = require('express');

const app = express();

// app.get('/',function(req,res){
//     res.send("hello")
// });
// // app.get(/^\/student\/([\d]{6})$/,function(req,res){
// //     res.send('学生信息，学号为：'+req.params[0]);
// // });
// app.get('/teacher/:id',function(req,res){
//     res.send('老是信息，ID为：'+req.params.id);
// });

// app.set('view engine','ejs');

// app.get('/test',function(req,res){
//     res.render('test',{
//         'news':['我是江小白','食戟之灵','一人之下']
//     });
// });
// // app.get('/demo',function(req,res){
// //     res.render('index');
// // });
// app.get('/student/:id',function(req,res){
//     var id = req.params.id;
//     var reg = /^[\d]{6}$/; //验证学号
//     if(reg.test(id)){
//         res.send('学号为：'+id);
//     }else{
//         res.send('格式错了~~~');
//     }
// });
// app.get("/form",function(req,res){
//     res.render("form");
// });
// app.post("/index.ejs",function(req,res){
//     //将数据添加进入数据库
//     res.render("index");
// });

// app.get('/:user/:id',function(req,res,next){
//     if(req.params.user!='admin' && req.params.id!='login'){
//         res.send("用户信息为："+ req.params.user+" ID为："+req.params.id);
//     }else{
//         next();
//     }
// });

// app.get('/admin/login',function(req,res){
//     res.send("登陆");
// });

// app.use('/admin',function(req,res){
//     res.set('Content-Type', 'text/plain;charset=utf8');
//     var data = "你好"
//     res.write(req.originalUrl+'\n');
//     res.write(req.baseUrl+'\n');
//     res.write(req.path+'\n');
//     res.end(data);
// })
// app.use(function(req,res,next){
//     console.log(new Date());
//     next();
// });
// app.use(function(req,res){
//     res.status(404).send("<h1>404</h1>")
// });
app.set('views','page')
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('home');
});
app.listen(9527);