var Router = require('react-router');
var React = require('react');

var Participants = React.createClass({
  mixins: [ Router.State ],

  render: function() {
    var eventId = this.getParams().eventId;

    console.log('Participants tab: eventId = ', eventId);
    return (
      /* jshint ignore:start */
      <div className="participants">
        <p>Participants tab active</p>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Participants;