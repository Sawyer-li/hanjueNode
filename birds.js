var express = require('express');
var router = express.Router();
var ajax = require('superagent');
var eventproxy = require('eventproxy');


router.use(function timelog(req,res,next){
    next();
})
router.get('/',function(req,res){
    var $res = res;
    var nodeUrl = 'http://cnodejs.org/?tab=all&page=2';
    var ep = new eventproxy();
    //调用主页获取各种列表
    var hanjueUrlBase = 'http://www.all4lib.com/hanjue/'
    //var hanjueUrlBase = 'http://192.168.31.134:8080/hanjue/'
    var time = new Date();

    var t1 = new Date().getTime();
    
    ajax.get(hanjueUrlBase+"postSearch/getPostByLabel")
        .end(function(err,res){
            var t2 = new Date().getTime();
            var dataLine = t2-t1;
            console.log('第一次接口时间间隔:'+dataLine);        
            var resData = JSON.parse(res.text);
            var data = resData.data;
            for(var i in data){
                for(var j in data[i]){
                    if(data[i][j].picturepath != null){
                        data[i][j].picturepath = data[i][j].picturepath; 
                    }
                    data[i][j].routerObject = {
                        path: "/topic/"+data[i][j].pid,
                        query: { ifpost: data[i][j].ifpost }
                    }
                }
            }
            console.log('getPostByLabel is sucess');
            ep.emit('getPostByLabel', data);
        });
    //获取飙升帖子
    ajax.get(hanjueUrlBase+'postSearch/riseUpPost')
        .end(function(err,res){
            var resData = JSON.parse(res.text);
            var data = resData.data;
            for(var i in data){
                data[i].routerObject ={
                    path: "/topic/"+data[i].pid,
                    query: { ifpost: data[i].ifpost }
                };
            }
            console.log('riseUpPost is sucess');
            ep.emit('riseUpPost', data);
        });
    //获取热门点击
    ajax.get(hanjueUrlBase+'postSearch/hotClicksPost')
        .end(function(err,res){
            var resData = JSON.parse(res.text);
            var data = resData.data;
            for(var i in data){
                data[i].routerObject ={
                    path: "/topic/"+data[i].pid,
                    query: { ifpost: data[i].ifpost }
                };
            }
            console.log('hotClicksPost is sucess');
            ep.emit('hotClicksPost', data);
        });
    ep.all('getPostByLabel','riseUpPost','hotClicksPost',function (data1,data2,data3) {
        var t3 = new Date().getTime();
        var dataLline = t3-t1;
        console.log("所有接口跑完时间:"+dataLline);
        console.log('开始渲染');
        console.log(data2);
        $res.render('index',{initData: data1, riseData:data2, hotData:data3});
    });
})


router.get('/bbs',function(req,res){
    res.send('Anout Bbs');
})
router.get('/test',function(req,res){
    res.render('layout');
})

module.exports = router;
