jest.dontMock('../Content.react.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var FlockApp = require('../Content.react.js');

describe('FlockApp', function() {

  var app;

  beforeEach(function() {
    /* jshint ignore:start */
    app = TestUtils.renderIntoDocument(<FlockApp />);
    /* jshint ignore:end */
  });

  it('should be rendered', function() {
    expect(app).not.toBe(null);
  });
});