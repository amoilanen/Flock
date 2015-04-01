/* jshint ignore:start */
var Promise = require('es6-promise').Promise;
/* jshint ignore:end */

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

Database.prototype.find = function(collectionName, query, projection) {
  var self = this;

  projection = projection || {};
  return new Promise(function(resolve, reject) {
    var collection = self.db.collection(collectionName);

    collection.find(query, projection).toArray(function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
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

Database.prototype.update = function(collectionName, query, doc) {
  var self = this;

  return new Promise(function(resolve, reject) {
    var collection = self.db.collection(collectionName);

    collection.update(query, doc, {}, function(err, result) {
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