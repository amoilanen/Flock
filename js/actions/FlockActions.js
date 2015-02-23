var AppDispatcher = require('../dispatcher/AppDispatcher');
var FlockConstants = require('../constants/FlockConstants');

var FlockActions = {

  create: function() {
    AppDispatcher.dispatch({
      actionType: FlockConstants.FLOCK_CREATE
    });
  }
};

module.exports = FlockActions;