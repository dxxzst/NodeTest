const express = require('express');
const app = express();
const myRequest = require('./server/myRequest');

//允许跨域
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "*");
    if (req.method.toLowerCase() === 'options') {
        res.send(200);
    } else {
        next();
    }
});

//提供静态资源
app.use(express.static('web'));

app.get('/*', function (req, res) {
    if (req.url.indexOf('.pdf') !== -1) {
        myRequest.requestPdf2(function (data) {
            res.status(200).json(data);
        }, req.originalUrl);
    } else {
        res.send(200);
    }
});

app.post('/api/search/research_report_figure', function (req, res) {
    req.on('data', function (data) {
        myRequest.requestSearch(function (data) {
            res.send(data);
        }, data);
    });
});

var server = app.listen(9872, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
