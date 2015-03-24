/* jshint ignore:start */
var Promise = require('es6-promise').Promise;
/* jshint ignore:end */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FlockConstants = require('../constants/FlockConstants');
var assign = require('object-assign');
var Router = require('react-router');
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

var _flock = {};

var FlockStore = assign({}, EventEmitter.prototype, {
  addOnCreateListener: function(callback) {
    this.on(CREATE_EVENT, callback);
  },
  removeOnCreateListener: function() {
    this.removeListener(CREATE_EVENT, callback);
  },
  loadFlock: function(accessKey, role) {
    var url = ['', 'flock', role, accessKey].join('/');

    return Promise.resolve($.get(url)).then(function(flock) {
      _flock = flock;
      return flock;
    });
  },
  getFlock: function() {
    return _flock;
  }
});

AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case FlockConstants.FLOCK_CREATE:
      Promise.resolve($.post('/new')).then(function(flock) {
        _flock = flock;
        FlockStore.emit(CREATE_EVENT);
      });
      break;

    default:
  }
});

module.exports = FlockStore;