var express=require('express');
var app =express();
var bodyParser = require('body-parser');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'www.db4free.net',
    user     : 'chikan',
    password : '19881410',
    database : 'chikantest'
});
connection.connect();

//引用bodyParser 这个不要忘了写
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var questions=[
    {
        data:213,
        num:444,
        age:12
    },
    {
        data:456,
        num:678,
        age:13
    }];
//写个接口123
app.get('/123',function(req,res){
    res.status(200),
        res.json(questions)
});

app.get('/getSql',function(req,res){

    var getsql =`SELECT history FROM test WHERE age=1988`
    res.status(200),
    connection.query(getsql,function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.json(result);
    })
});


app.get('/setSql',function(req,res){

    var text = req.query.text
    var user = req.query.user
    var date = new Date()
    var time = date.toLocaleString()
    var info = `{"text":"${text}","user":"${user}","time":"${time}"}`
    info=JSON.stringify(info)
    var  setsql = `UPDATE test SET history=json_merge(history,${info}) WHERE age = 1988;`
    res.status(200),
    connection.query(setsql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        res.send({status:200})
        console.log(info)
    });
});



app.post('/wdltest',function(req,res){
    console.log(req.stack);
    console.log(req.body);
    console.log(req.url);
    console.log(req.query);
    res.json(req.body)
})
//配置服务端口
var server = app.listen(3001, function () {

    var host = server.address().address;

    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})
