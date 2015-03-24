/* jshint ignore:start */
var Promise = require('es6-promise').Promise;
/* jshint ignore:end */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FlockConstants = require('../constants/FlockConstants');
var assign = require('object-assign');
var Router = require('react-router');
var $ = require('jquery');

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
        FlockStore.emit(FlockConstants.CREATE_EVENT);
      });
      break;
    case FlockConstants.FLOCK_LOAD:
      var {role, accessKey} = action.actionDetail;
      var url = ['', 'flock', role, accessKey].join('/');

      Promise.resolve($.get(url)).then(function(flock) {
        _flock = flock;
        FlockStore.emit(FlockConstants.LOAD_EVENT);
      });
      break;

    default:
  }
});

module.exports = FlockStore;