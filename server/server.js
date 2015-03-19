var fs = require('fs');
var path = require('path');
var express = require('express');
var Database = require('./db').Database;
var uuid = require('./uuid').uuid;

var dbName = 'flock';
var flockCollectionName = 'flocks';
var url = 'mongodb://localhost:27017/' + dbName;

var db = new Database(url);

var app = express();

function getClientRoot() {
  var clientRoot = path.join(__dirname, 'client');

  if (!fs.existsSync(clientRoot)) {
    clientRoot = path.dirname(__dirname);
  }
  return clientRoot;
}

var clientRoot = getClientRoot();

app.use(express.static(clientRoot));

function rewriteUrlToIndex(request, response, next) {
  response.sendFile(path.join(clientRoot, 'index.html'));
}

app.get('/configuration/*', rewriteUrlToIndex);
app.get('/participation/*', rewriteUrlToIndex);

app.post('/new', function(req, res) {
  var currentTime = new Date().getTime();
  var adminKey = currentTime + '.' + uuid();
  var guestKey = currentTime + '.' + uuid();
  var flock = {
    createdAt: new Date().getTime(),
    name: 'Floorball',
    organizer: 'Anton',
    details: 'Wednesday\'s game',
    where: 'Espoo',
    when: '19/3/2011 10:00',
    maxParticipants: 20,
    locked: false,
    adminKey: adminKey,
    guestKey: guestKey,
    participants: []
  };

  db.getConnection().then(function() {
    return db.insert(flockCollectionName, [flock]);
  }).then(function() {
    res.json(flock);
  }).catch(function(err) {
    res.sendStatus(500);
  });
});

console.log('Flock server is listening on the port 8080');
app.listen(8080);