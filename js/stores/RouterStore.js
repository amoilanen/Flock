var AppDispatcher = require('../dispatcher/AppDispatcher');
var FlockConstants = require('../constants/FlockConstants');

var _router;

function set(router) {
  _router = router;
}

function get() {
  return _router;
}

AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case FlockConstants.OPEN_TAB:
      _router.transitionTo(action.actionDetail.tab, {
        accessKey: action.actionDetail.accessKey,
        role: action.actionDetail.role
      });
      break;

    default:
  }
});

module.exports = {
  set: set,
  get: get
};