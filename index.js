
var express = require('express');
var app = express();
const path = require('path');

// Define the port to run on
app.set('port', 2368);

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/alexa/test', (req, res) => {

  console.log(req.body);
  res.send(500);
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
