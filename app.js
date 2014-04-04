var express = require('express');
var app = express();



app.get('/', function(req, res) {
   res.sendfile('index.html');
});

app.get('/json', function(req, res) {
    res.send('JSON HERE!');
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

var server = app.listen(3001);