var express = require('express');
var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.eduro.com/";
tod = '';
var app = express();
var PORT = 3000;

app.get('/', function(req, res) {
    request(url, function(error, response, body) {
        // if (!error) {
        //     var $ = cheerio.load(body),
        //         tod = $("dailyquote p").html();
        //     console.log(tod);

        // } else {
        //     console.log("We’ve encountered an error: " + error);
        // }
        res.send(200, { "tod": "Hello There" }); //tod
    });
});

app.listen(PORT, function() {
    console.log('Express server started at PORT : ' + PORT);
});