var express = require('express');
var request = require("request"),
	cheerio = require("cheerio"),
	url = "http://www.eduro.com/";
	tod = '';
var app = express();

app.set('port', process.env.PORT || 1337);


app.get('/', function(req, res) {
	request(url, function (error, response, body) {
		if (!error) {
			var $ = cheerio.load(body),
				tod = $("dailyquote p").html();
				console.log(tod); 
				
		} else {
			console.log("We’ve encountered an error: " + error);
		}
		res.send(200, {"tod": tod});		
	});
});

app.listen(3000);
