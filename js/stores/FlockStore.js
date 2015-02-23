var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FlockConstants = require('../constants/FlockConstants');
var assign = require('object-assign');

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
      FlockStore.emit(CREATE_EVENT);
      break;

    default:
  }
});

module.exports = FlockStore;
