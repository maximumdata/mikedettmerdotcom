
var express = require('express');
var app = express();
const path = require('path');
const needle = require('needle');
const cheerio = require('cheerio');

// Define the port to run on
app.set('port', 2368);

app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/dm/statue', (req, response) => {
    needle('get', 'http://warpwalkers.com/2017/statuegenerator/')
    .then((res) => {
        const $ = cheerio.load(res.body);
        let desc = $('h3 .su-box-content').text().trim();
        let trigger = $('#content > .su-box.su-box-style-default > .su-box-content.su-clearfix').first().text().trim();
        return response.json({ desc, trigger });
    })
    .catch((err) => {
        console.log(err);
        return response.json(err).status(500);
    });
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
