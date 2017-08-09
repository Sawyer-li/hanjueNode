var express = require('express');
var router = express.Router();
var ajax = require('superagent');
var eventproxy = require('eventproxy');
var SelectList = {headInterests:[],bottomInterests: []};
//var hanjueUrlTest = 'http://www.all4lib.com/hanjue/'
//var hanjueUrlTest = 'http://47.92.6.182:8088/hanjue/'
var hanjueUrlTest = 'http://192.168.31.134:8080/hanjue/'
//展示型数据只在启动时候加载一次，暂时不知道好不好
ajax.get(hanjueUrlTest+'member/getInterests')
    .end(function(err,res){
        var resData = JSON.parse(res.text);
        var rawData = resData.data;
        for(var item in rawData){
            if(item<16){
                var typeObj = rawData[item]; 
                typeObj.iSActive = false;
                SelectList.headInterests.push(typeObj);
            }else{
                var typeObj = rawData[item]; 
                typeObj.iSActive = false;
                SelectList.bottomInterests.push(typeObj);
            }
        }
    })
router.use(function timelog(req,res,next){
    next();
})
router.get('/',function(req,res){
    var $res = res;
    var nodeUrl = 'http://cnodejs.org/?tab=all&page=2';
    var ep = new eventproxy();
    //调用主页获取各种列表
    var time = new Date();
    var t1 = new Date().getTime();
    ajax.get(hanjueUrlTest+"postSearch/getPostByLabel")
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
    ajax.get(hanjueUrlTest+'postSearch/riseUpPost')
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
    ajax.get(hanjueUrlTest+'postSearch/hotClicksPost')
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
        console.log(SelectList);
        $res.render('index',{initData: data1, riseData:data2, hotData:data3,listData: SelectList});

    });
})


router.get('/bbs',function(req,res){
    res.send('Anout Bbs');
})
router.get('/test',function(req,res){
    res.render('test');
})
router.post('/operate',function(req,res){
    console.log('响应了')
    console.log(req);
    console.log(req.body);
    console.log(req.query);
    res.send('test');
})
router.get('/topic/:topicId',function(req,res){
    //console.log(req.params);
    //console.log(req.query);
    $res = res;
    ajax.post('/operate')
        .set('Content-Type', 'application/json')
        /*.query({ query: 'Manny' })
        .query({ range: '1..5' })
        .query({ order: 'desc' })*/
        .send({ownName: 'sawyer'})
        .end(function(err,res){
            //console.log('res内容');
            //console.log(res.text);
            $res.render('topic',{listData: SelectList});
        })
})
module.exports = router;
