var Content = require('./Content.react');
var Header = require('./Header.react');
var React = require('react');
var Router = require('react-router');
var FlockActions = require('../actions/FlockActions');
var FlockConstants = require('../constants/FlockConstants');
var RouterStore = require('../stores/RouterStore');
var FlockStore = require('../stores/FlockStore');
var RouterStore = require('../stores/RouterStore');

var FlockApp = React.createClass({

  mixins: [Router.State],

  getInitialState: function() {
    return {
      flock: {},
      role: ''
    };
  },

  _onFlockUpdate: function() {
    this.setState({
      flock: FlockStore.getFlock(),
      role: FlockStore.getRole()
    });
  },

  componentDidMount: function() {
    var self = this;
    var accessKey = this.getParams().accessKey;
    var role = this.getParams().role;

    if (accessKey) {
      FlockActions.load(role, accessKey);
    }
    FlockStore.on(FlockConstants.EVENTS.UPDATE_EVENT, this._onFlockUpdate);
  },

  componentWillUnmount: function() {
    FlockStore.removeListener(FlockConstants.EVENTS.UPDATE_EVENT, this._onFlockUpdate);
  },

  _renderTitle: function() {
    var titlePrefix = (this.state.role === FlockConstants.ROLES.ADMIN) ? 'Manage' : 'Join';

    if (typeof this.state.flock.name !== 'undefined') {
      document.title = ['Flock. ', titlePrefix, '"' + this.state.flock.name + '".'].join(' ');
    } else {
      document.title = ['Flock.']
    }
  },

  render: function() {
    this._renderTitle();
    return (
      /* jshint ignore:start */
      <div>
        <Header />
        <Content flock={this.state.flock} role={this.state.role}/>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = FlockApp;