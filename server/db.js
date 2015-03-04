var Promise = require('es6-promise').Promise;
var MongoClient = require('mongodb').MongoClient;

function Database(url) {
  this.url = url;
  this.db = null;
}

Database.prototype.getConnection = function() {
  var self = this;

  if (this.db) {
    return Promise.resolve(this.db);
  } else {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(self.url, function(err, db) {
        if (err) {
          reject(err);
        } else {
          self.db = db;
          resolve(db);
        }
      });
    });
  }
};

Database.prototype.insert = function(collectionName, docs) {
  var self = this;

  return new Promise(function(resolve, reject) {
    var collection = self.db.collection(collectionName);

    collection.insert(docs, function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

Database.prototype.disconnect = function() {
  this.db.close();
  this.db = null;
};

module.exports = {
  Database: Database
};