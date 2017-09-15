var express = require('express');
var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.eduro.com/";

var app = express();

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
    request(url, function(error, response, body) {
        if (!error) {
            var reg = /[A-Z]([a-z]+|\.)(?:\s+[A-Z]([a-z]+|\.))*(?:\s+[a-z][a-z\-]+){0,2}\s+[A-Z]([a-z]+|\.)/
            var $ = cheerio.load(body);
            var tod = $("dailyquote p").html();
            var author = $('dailyquote p.author').text().trim().match(reg)[0];

        } else {
            console.log("We’ve encountered an error: " + error);
        }
        res.send(200, { "tod": tod, "author": author });
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server started at PORT : ' + app.get('port'));
});