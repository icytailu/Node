var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('form')
});

// bodyParser API
app.use(bodyParser.urlencoded({ extended:false }));

app.post('/',function(req,res){
    console.log(req.body);
    res.send(req.body);
})

app.listen(8000);