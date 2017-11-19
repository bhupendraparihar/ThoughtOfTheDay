var express = require('express');
var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.eduro.com/";

var app = express();
var todaysDate = "";
var tod = "";
var author = "";
app.set('port', (process.env.PORT || 3000));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headerss", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    let now = new Date();
    let currentDate = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
    if (todaysDate !== currentDate) {
        request(url, function(error, response, body) {
            if (!error) {
                var reg = /[A-Z]([a-z]+|\.)(?:\s+[A-Z]([a-z]+|\.))*(?:\s+[a-z][a-z\-]+){0,2}\s+[A-Z]([a-z]+|\.)/
                var $ = cheerio.load(body);
                tod = $("dailyquote p").html();
                author = $('dailyquote p.author').text().trim().match(reg)[0];
                todaysDate = currentDate;
            } else {
                console.log("We’ve encountered an error: " + error);
            }
            res.send(200, { "tod": tod, "author": author });
        });
    } else {
        res.send(200, { "tod": tod, "author": author });
    }

});

app.listen(app.get('port'), function() {
    console.log('Express server started at PORT : ' + app.get('port'));
});