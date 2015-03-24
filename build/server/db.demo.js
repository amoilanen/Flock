var Database = require('./db').Database;

var dbName = 'flock';
var flockCollectionName = 'flocks';
var url = 'mongodb://localhost:27017/' + dbName;

var db = new Database(url);

var query = {
  adminKey: '1426805448645.20c95c3c-350a-6f66-9df5-fdaed9fd6275'
};

var projection = {
  adminKey: 'adminKey',
  guestKey: 'guestKey'
};

db.getConnection().then(function() {
  return db.find(flockCollectionName, query, projection).then(function(results) {
    console.log('results = ', results);
  });
});