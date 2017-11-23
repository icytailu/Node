var express = require('express');
var app = express();

app.get('/',function(req,res){
    console.log(req.query.id)
    res.send("<h1>小样~</h1>");
});

app.listen(8080);