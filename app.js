var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var birds = require('./birds');
app.set('views','./views');
app.set('view engine', 'jade');
app.use(express.static('assets'));
//是否启用还要考虑是否，用本服务器开接口
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',birds);
app.use(function(req,res,next){
    /*var err = new Error('Not Found');
    err.status = 404;*/
    next();
})

var server = app.listen(3000, function(){
    console.log('已在3000端口开服务器');
});
