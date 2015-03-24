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
      flock: {}
    };
  },

  _onNew: function() {
    this.setState({
      flock: FlockStore.getFlock()
    });
    RouterStore.get().transitionTo('event', {
      accessKey: this.state.flock.adminKey,
      role: 'admin'
    });
  },

  _onLoad: function() {
    this.setState({
      flock: FlockStore.getFlock()
    });
  },

  componentDidMount: function() {
    var self = this;
    var accessKey = this.getParams().accessKey;
    var role = this.getParams().role;

    if (accessKey) {
      FlockActions.load(accessKey, role);
    }
    FlockStore.on(FlockConstants.CREATE_EVENT, this._onNew);
    FlockStore.on(FlockConstants.LOAD_EVENT, this._onLoad);
  },

  componentWillUnmount: function() {
    FlockStore.removeListener(FlockConstants.CREATE_EVENT, this._onNew);
    FlockStore.removeListener(FlockConstants.LOAD_EVENT, this._onLoad);
  },

  render: function() {

    return (
      /* jshint ignore:start */
      <div>
        <Header />
        <Content flock={this.state.flock}/>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = FlockApp;