/* jshint ignore:start */
var Promise = require('es6-promise').Promise;
/* jshint ignore:end */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var FlockConstants = require('../constants/FlockConstants');
var assign = require('object-assign');
var Router = require('react-router');
var $ = require('jquery');

var RouterStore = require('./RouterStore');

var DEFAULT_FLOCK = {
  createdAt: new Date().getTime(),
  name: '',
  organizer: '',
  details: '',
  where: '',
  when: ''
};

var _flock = {};
var _role;

var FlockStore = assign({}, EventEmitter.prototype, {
  getFlock: function() {
    return _flock;
  },
  getRole: function() {
    return _role;
  },
  getAccessKey: function() {
    return _role === 'admin' ? _flock.adminKey : _flock.guestKey;
  }
});

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case FlockConstants.FLOCK_SAVE:
      var data = action.actionDetail.flock;

      data.adminKey = _flock.adminKey;
      var request = $.ajax({
        type: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        url: '/save',
        data: JSON.stringify({
          flock: data
        })
      });

      Promise.resolve(request).then(function(flock) {
        /*
        _flock = flock;
        FlockStore.emit(FlockConstants.UPDATE_EVENT);
        */
      });
      break;
    case FlockConstants.FLOCK_CREATE:
      Promise.resolve($.post('/new')).then(function(flock) {
        _flock = flock;
        RouterStore.get().transitionTo('event', {
          accessKey: flock.adminKey,
          role: 'admin'
        });
        _role = 'admin';
        FlockStore.emit(FlockConstants.UPDATE_EVENT);
      });
      break;
    case FlockConstants.FLOCK_LOAD:
      var {role, accessKey} = action.actionDetail;
      var url = ['', 'flock', role, accessKey].join('/');

      _role = role;
      Promise.resolve($.get(url)).then(function(flock) {
        _flock = flock;
        FlockStore.emit(FlockConstants.UPDATE_EVENT);
      });
      break;

    default:
  }
});

module.exports = FlockStore;