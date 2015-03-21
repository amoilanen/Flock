var Router = require('react-router');
var React = require('react');

var Participants = React.createClass({
  mixins: [Router.State],

  render: function() {
    var accessKey = this.getParams().accessKey;

    console.log('Participants tab: accessKey = ', accessKey);
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