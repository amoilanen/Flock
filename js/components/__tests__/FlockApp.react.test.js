jest.dontMock('../Content.react.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var FlockApp = require('../Content.react.js');
var Router = require('react-router');
var {Route, Handler} = Router;

describe('FlockApp', function() {

  var app;

  beforeEach(function() {
    /* jshint ignore:start */
    var routes = (
      <Route handler={FlockApp}/>
    );
    Router.run(routes, function(Handler) {
      app = TestUtils.renderIntoDocument(<Handler />);
    });
    /* jshint ignore:end */
  });

  it('should be rendered', function() {
    expect(app).not.toBe(null);
  });
});