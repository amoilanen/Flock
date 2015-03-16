jest.dontMock('../Content.react.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Content = require('../Content.react.js');
var Router = require('react-router');
var {Route, Handler} = Router;

describe('Content', function() {

  var component;

  beforeEach(function() {
    /* jshint ignore:start */
    var routes = (
      <Route handler={Content}/>
    );
    Router.run(routes, function(Handler) {
      component = TestUtils.renderIntoDocument(<Handler />);
    });
    /* jshint ignore:end */
  });

  it('should be rendered', function() {
    expect(component).not.toBe(null);
  });

  describe('logo', function() {

    it('logo should be rendered', function() {
      var logo = TestUtils.findRenderedDOMComponentWithClass(component, 'logo');

      expect(logo).not.toBe(null);
    });
  });
});