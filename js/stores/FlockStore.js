/* jshint ignore:start */
var Promise = require('es6-promise').Promise;
/* jshint ignore:end */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FlockConstants = require('../constants/FlockConstants');
var assign = require('object-assign');
var $ = require('jquery');

var CREATE_EVENT = 'create';

var DEFAULT_FLOCK = {
  createdAt: new Date().getTime(),
  name: '',
  organizer: '',
  details: '',
  where: '',
  when: ''
};

var _currentFlock = {};

var FlockStore = assign({}, EventEmitter.prototype, {
  addOnCreateListener: function(callback) {
    this.on(CREATE_EVENT, callback);
  },
  removeOnCreateListener: function() {
    this.removeListener(CREATE_EVENT, callback);
  },
  loadFlock: function(accessKey) {
    return Promise.resolve($.get('/flock/' + accessKey)).then(function(flock) {
      _currentFlock = flock;
      return flock;
    });
  }
});

AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case FlockConstants.FLOCK_CREATE:
      Promise.resolve($.post('/new')).then(function(flock) {
        FlockStore.emit(CREATE_EVENT);
        _currentFlock = flock;
        document.location.pathname = '/configuration/' + flock.adminKey;
      });
      break;

    default:
  }
});

module.exports = FlockStore;