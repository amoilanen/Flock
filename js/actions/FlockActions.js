var AppDispatcher = require('../dispatcher/AppDispatcher');
var FlockConstants = require('../constants/FlockConstants');

var FlockActions = {

  save: function(flock) {
    AppDispatcher.dispatch({
      actionType: FlockConstants.ACTIONS.FLOCK_SAVE,
      actionDetail: {
        flock: flock
      }
    });
  },

  create: function() {
    AppDispatcher.dispatch({
      actionType: FlockConstants.ACTIONS.FLOCK_CREATE
    });
  },

  load: function(role, accessKey) {
    AppDispatcher.dispatch({
      actionType: FlockConstants.ACTIONS.FLOCK_LOAD,
      actionDetail: {
        accessKey: accessKey,
        role: role
      }
    });
  },

  openTab: function(tab, role, accessKey) {
    AppDispatcher.dispatch({
      actionType: FlockConstants.ACTIONS.OPEN_TAB,
      actionDetail: {
        tab: tab,
        accessKey: accessKey,
        role: role
      }
    });
  }
};

module.exports = FlockActions;