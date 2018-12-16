const http = require("http");
const fs = require('fs');
var request = require('request');

const token = "";

function requestSearch(callback, data) {
    let opt = {
        host: 'dev.shannonai.com',
        port: '8011',
        method: 'POST',
        path: '/api/search/research_report_figure',
        headers: {
            "Content-Type": "application/json",
            "token": token
        }
    };

    let body = '';
    let req = http.request(opt, function (res) {
        console.log("response: " + res.statusCode);
        res.on('data', function (data) {
            body += data;
        }).on('end', function () {
            callback(body);
        });
    }).on('error', function (e) {
        body = "error: " + e.message;
        callback(body);
    });
    req.write(data);
    req.end();
}

function requestPdf2(callback, url) {
    let options = {
        url: 'http://dev.shannonai.com:8011' + url,
        method: 'GET',
        headers: {
            "token": token
        }
    };
    let tempList = url.split('/');
    let fileName = tempList[tempList.length - 1];
    let path = "web/files/" + fileName;
    fs.exists(path, function (exists) {
        if (!exists) {
            request(options).pipe(fs.createWriteStream(path).on('finish', function () {
                callback(path);
            }))
        } else {
            callback(path);
        }
    });
}

function requestPdf(callback, url) {
    let opt = {
        host: 'dev.shannonai.com',
        port: '8011',
        method: 'GET',
        path: url,
        headers: {
            "token": token
        },
        encoding: null
    };


    const buffer = request.get(pdf.url, {encoding: null}).pipe(fs.createWriteStream('doodle.png'));

    let body = '';
    let req = http.request(opt, function (res) {
        console.log("response: " + res.statusCode);
        res.on('data', function (data) {
            body += data;
        }).on('end', function () {
            let tempList = url.split('/');
            let fileName = tempList[tempList.length - 1];
            let path = "web/files/" + fileName;
            fs.exists(path, function (exists) {
                if (!exists) {
                    fs.writeFileSync(path, body, 'binary');
                }
                callback(path);
            });

        });
    }).on('error', function (e) {
        body = "error: " + e.message;
        callback(body);
    });
    req.end();
}

module.exports = {requestSearch, requestPdf, requestPdf2};
