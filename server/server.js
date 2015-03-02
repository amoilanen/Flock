var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.dirname(__dirname)));

/*
app.get('/', function(req, res){
  res.send('hello world');
});
*/

console.log('Flock server is listening on the port 8080');
app.listen(8080);