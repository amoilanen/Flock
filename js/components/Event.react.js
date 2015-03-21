var React = require('react');
var FlockStore = require('../stores/FlockStore');

var Event = React.createClass({

  //TODO: Support editing the field of the current flock
  render: function() {
    console.log('Loaded events tab = ', this.props.flock);
    return (
      /* jshint ignore:start */
      <div className="event">
        <label>Name</label><input type="text" value={this.props.flock.name}></input>
        <label>Organizer</label><input type="text" value={this.props.flock.organizer}></input>
        <label>Details</label><input type="text" value={this.props.flock.details}></input>
        <label>Where</label><input type="text" value={this.props.flock.where}></input>
        <label>When</label><input type="text" value={this.props.flock.when}></input>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Event;