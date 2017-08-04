var express = require('express');
var app = express();
//var path = require('path');
var birds = require('./birds');
app.set('views','./views');
app.set('view engine', 'jade');
app.use('/',birds);
app.use(function(req,res,next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

var server = app.listen(3000, function(){
    console.log('已在3000端口开服务器');
});
