jest.dontMock('../Header.react.js');

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var FlockActions = require('../../actions/FlockActions.js');
var Header = require('../Header.react.js');

describe('Header', function() {

  var component;

  beforeEach(function() {
    /* jshint ignore:start */
    component = TestUtils.renderIntoDocument(<Header />);
    /* jshint ignore:end */
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

  describe('invite button', function() {

    var inviteButton;

    beforeEach(function() {
      inviteButton = TestUtils.findRenderedDOMComponentWithClass(component, 'invite-others');
    });

    it('should be rendered', function() {
      expect(inviteButton).not.toBe(null);
    });
  });

  describe('event tab', function() {

    var eventTab;

    beforeEach(function() {
      eventTab = TestUtils.findRenderedDOMComponentWithClass(component, 'event');
    });

    it('should be rendered', function() {
      expect(eventTab).not.toBe(null);
    });
  });

  describe('participants tab', function() {

    var participantsTab;

    beforeEach(function() {
      participantsTab = TestUtils.findRenderedDOMComponentWithClass(component, 'participants');
    });

    it('should be rendered', function() {
      expect(participantsTab).not.toBe(null);
    });
  });
});