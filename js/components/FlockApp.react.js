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

  _onFlockUpdate: function() {
    this.setState({
      flock: FlockStore.getFlock()
    });
  },

  componentDidMount: function() {
    var self = this;
    var accessKey = this.getParams().accessKey;
    var role = this.getParams().role;

    if (accessKey) {
      FlockActions.load(role, accessKey);
    }
    FlockStore.on(FlockConstants.UPDATE_EVENT, this._onFlockUpdate);
  },

  componentWillUnmount: function() {
    FlockStore.removeListener(FlockConstants.UPDATE_EVENT, this._onFlockUpdate);
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