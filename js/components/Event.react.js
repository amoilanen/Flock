var Router = require('react-router');
var React = require('react');

var Event = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    var eventId = this.getParams().eventId;

    console.log('Event tab: eventId = ', eventId);
    return (
      /* jshint ignore:start */
      <div className="event">
        <p>Event tab active</p>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Event;