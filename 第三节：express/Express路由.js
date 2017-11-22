const express = require('express');

const app = express();

app.get('/',function(req,res){
    res.send("hello")
});
app.get(/^\/student\/([\d]{6})$/,function(req,res){
    res.send('学生信息，学号为：'+req.params[0]);
});
app.get('/teacher/:id',function(req,res){
    res.send('老是信息，ID为：'+req.params.id);
});

app.set('view engine','ejs');

app.get('/test',function(req,res){
    res.render('test',{
        'news':['我是江小白','食戟之灵','一人之下']
    });
});
app.get('/demo',function(req,res){
    res.render('index');
})
app.listen(9527);