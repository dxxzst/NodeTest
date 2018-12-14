const http = require("http");
//const fs = require('fs');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWltZW5nIiwicGFzc3dvcmQiOiJ5aW1lbmciLCJ1c2VyVHlwZSI6InR5cGUxIiwiZXhwIjoxNTQ3MTc3Mzk3LCJpc3MiOiJnby5taWNyby5zcnYudXNlciJ9.1znZIOV6gvEp5-B-AfgkCqyHAAKwhlIvTc3-svMGoPI";

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

function requestPdf(callback, url) {
    let opt = {
        host: 'dev.shannonai.com',
        port: '8011',
        method: 'GET',
        path: url,
        headers: {
            "token": token
        }
    };

    let body = '';
    let req = http.request(opt, function (res) {
        console.log("response: " + res.statusCode);
        res.on('data', function (data) {
            body += data;
        }).on('end', function () {
            // let tempList = url.split('/');
            // let fileName = tempList[tempList.length - 1];
            // let path = "files/" + fileName;
            // fs.exists(path, function (exists) {
            //     if (!exists) {
            //         fs.writeFileSync(path, body);
            //     }
            // });
            callback(body);
        });
    }).on('error', function (e) {
        body = "error: " + e.message;
        callback(body);
    });
    req.end();
}

module.exports = {requestSearch, requestPdf};
