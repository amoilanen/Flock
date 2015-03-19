/* jshint ignore:start */
var Promise = require('es6-promise').Promise;
/* jshint ignore:end */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FlockConstants = require('../constants/FlockConstants');
var assign = require('object-assign');
var $ = require('jquery');

var CREATE_EVENT = 'create';

var _participants = [];

var FlockStore = assign({}, EventEmitter.prototype, {
  addOnCreateListener: function(callback) {
    this.on(CREATE_EVENT, callback);
  },
  removeOnCreateListener: function() {
    this.removeListener(CREATE_EVENT, callback);
  }
});

AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case FlockConstants.FLOCK_CREATE:
      Promise.resolve($.post('/new')).then(function(flock) {
        FlockStore.emit(CREATE_EVENT);
        document.location.pathname = '/configuration/' + flock.adminKey;
      });
      break;

    default:
  }
});

module.exports = FlockStore;