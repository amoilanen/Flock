var _router  = null;

function set(router) {
  _router = router;
}

function get() {
  return _router;
}

module.exports = {
  set: set,
  get: get
};