var AppDispatcher = require('../dispatcher/AppDispatcher');
var FlockConstants = require('../constants/FlockConstants');

var FlockActions = {

  create: function() {
    AppDispatcher.dispatch({
      actionType: FlockConstants.FLOCK_CREATE
    });
  },

  load: function(accessKey, role) {
    AppDispatcher.dispatch({
      actionType: FlockConstants.FLOCK_LOAD,
      actionDetail: {
        accessKey: accessKey,
        role: role
      }
    });
  }
};

module.exports = FlockActions;