jest.dontMock('../Content.react.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Content = require('../Content.react.js');

describe('Content', function() {

  var component;

  beforeEach(function() {
    /* jshint ignore:start */
    component = TestUtils.renderIntoDocument(<Content />);
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