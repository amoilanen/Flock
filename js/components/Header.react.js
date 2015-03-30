var React = require('react');
var Router = require('react-router');
var Button = require('./widgets/Button.react');
var FlockStore = require('../stores/FlockStore');
var RouterStore = require('../stores/RouterStore');
var FlockActions = require('../actions/FlockActions');

var Header = React.createClass({

  _onClick: function() {
    FlockActions.create();
  },

  _openTab: function(tab) {
    FlockActions.openTab(tab, FlockStore.getRole(), FlockStore.getAccessKey());
  },

  _openEventTab: function() {
    this._openTab('event');
  },

  _openParticipantsTab: function() {
    this._openTab('participants');
  },

  render: function() {
    var currentPath = Router.HistoryLocation.getCurrentPath().split('/');
    var topPage = currentPath[1];
    var isOnHomePage = (topPage.length === 0);

    var eventTabClass = (isOnHomePage ? "header-tab disabled" : "header-tab");
    var participantsTabClass = (isOnHomePage ? "header-tab disabled" : "header-tab");
    var inviteButtonClass = (isOnHomePage ? 'disabled' : '');

    if (topPage === 'event') {
      eventTabClass += ' active';
    } else if (topPage === 'participants') {
      participantsTabClass += ' active';
    }
    return (
      /* jshint ignore:start */
      <header>
        <span className="header-tab-container">
          <span className={eventTabClass}
                onClick={isOnHomePage ? function() {}: this._openEventTab}>
            <i className="fa fa-2x fa-cog"></i>
            <span className="event header-tab-label">Event</span>
          </span>
          <span className={participantsTabClass}
                onClick={isOnHomePage ? function() {}: this._openParticipantsTab}>
            <i className="fa fa-2x fa-users"></i>
            <span className="participants header-tab-label">Participants</span>
          </span>
        </span>
        <span className="header-button-container">
          <Button label="New event"
            iconClassName="fa fa-2x fa-plus-square-o" 
            onClick={this._onClick} />
          <Button label="Invite others"
            iconClassName="fa fa-2x fa-share"
            onClick={isOnHomePage ? function() {}: this._onClick}
            className={(isOnHomePage ? 'disabled' : '')} />
        </span>
      </header>
      /* jshint ignore:end */
    );
  }
});

module.exports = Header;