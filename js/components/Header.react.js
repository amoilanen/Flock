var React = require('react');
var FlockActions = require('../actions/FlockActions');

var Header = React.createClass({

  _onClick: function() {
    FlockActions.create();
  },

  //
  render: function() {
    return (
      /* jshint ignore:start */
      <header>
        <span className="header-tab-container">
          <span className="header-tab" onClick={this._onClick}>
            <i className="fa fa-2x fa-cog"></i>
            <span className="event header-tab-label">Event</span>
          </span>
          <span className="header-tab" onClick={this._onClick}>
            <i className="fa fa-2x fa-users"></i>
            <span className="participants header-tab-label">Participants</span>
          </span>
        </span>
        <span className="header-button-container">
          <span className="header-button" onClick={this._onClick}>
            <i className="fa fa-2x fa-plus-square-o"></i>
            <span className="create-event header-button-label">New event</span>
          </span>
          <span className="header-button" onClick={this._onClick}>
            <i className="fa fa-2x fa-share"></i>
            <span className="invite-others header-button-label">Invite others</span>
          </span>
        </span>
      </header>
      /* jshint ignore:end */
    );
  }
});

module.exports = Header;