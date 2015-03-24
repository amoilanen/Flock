var Content = require('./Content.react');
var Header = require('./Header.react');
var React = require('react');
var Router = require('react-router');
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

  componentDidMount: function() {
    var self = this;
    var accessKey = this.getParams().accessKey;
    var role = this.getParams().role;

    if (accessKey) {
      FlockStore.loadFlock(accessKey, role).then(function(flock) {
        self.setState({flock: flock})
      });
    }
    FlockStore.addOnCreateListener(this._onNew);
  },

  componentWillUnmount: function() {
    FlockStore.removeOnCreateListener(this._onNew);
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