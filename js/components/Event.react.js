var React = require('react');
var FlockStore = require('../stores/FlockStore');

var Event = React.createClass({

  //TODO: Support editing the field of the current flock
  render: function() {
    console.log('Loaded events tab = ', this.props.flock);
    return (
      /* jshint ignore:start */
      <section className="event-details">
        <div className="field">
          <label>Name</label>
          <input type="text" value={this.props.flock.name}></input>
        </div>
        <div className="field">
          <label>Organizer</label>
          <input type="text" value={this.props.flock.organizer}></input>
        </div>
        <div className="field">
          <label>Details</label>
          <input type="text" value={this.props.flock.details}></input>
        </div>
        <div className="field">
          <label>Where</label>
          <input type="text" value={this.props.flock.where}></input>
        </div>
        <div className="field">
          <label>When</label>
          <input type="text" value={this.props.flock.when}></input>
        </div>
      </section>
      /* jshint ignore:end */
    );
  }
});

module.exports = Event;