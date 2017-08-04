var express = require('express');
var router = express.Router();
var ajax = require('superagent');




router.use(function timelog(req,res,next){
    console.log('Time',Date.now());
    next();
})
router.get('/',function(req,res){
    var $res = res;
    var nodeUrl = 'http://cnodejs.org/?tab=all&page=2';
    var hanjueUrl = 'http://192.168.31.134:8080/hanjue/postSearch/getPostByLabel'
    ajax.get(hanjueUrl)
        .end(function(err,res){
            var resData = JSON.parse(res.text);
            var data = resData.data.xppx;
            console.log(data);
            $res.render('index',{label: data});
        })
    })
router.get('/bbs',function(req,res){
    res.send('Anout Bbs');
})

module.exports = router;
