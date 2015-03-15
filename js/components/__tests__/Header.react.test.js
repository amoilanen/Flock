jest.dontMock('../Header.react.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var FlockActions = require('../../actions/FlockActions.js');
var Header = require('../Header.react.js');

describe('Header', function() {

  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(<Header />);
  });

  it('should be rendered', function() {
    expect(component).not.toBe(null);
  });

  describe('new event button', function() {

    var createEventButton;

    beforeEach(function() {
      createEventButton = TestUtils.findRenderedDOMComponentWithClass(component, 'create-event');
    });

    it('should be rendered', function() {
      expect(createEventButton).not.toBe(null);
    });

    it('should trigger create action', function() {
      TestUtils.Simulate.click(createEventButton);
      expect(FlockActions.create.mock.calls).toEqual([{}]);
    });
  });
});