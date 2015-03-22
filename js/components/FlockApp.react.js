var Content = require('./Content.react');
var Header = require('./Header.react');
var React = require('react');
var Router = require('react-router');
var FlockStore = require('../stores/FlockStore');

//TODO: Read this and query for the flock earlier and query for the flock
//TODO: Do not reload the whole app when navigating to a new URL
//TODO: Load current flock only once when the top app component is rendered if it is required
//and then only when a new flock is created

var FlockApp = React.createClass({

  mixins: [Router.State],

  getInitialState: function() {
    return {
      flock: {}
    };
  },

  _onCreate: function() {
    console.log("New flock created");
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
    FlockStore.addOnCreateListener(this._onCreate);
  },

  componentWillUnmount: function() {
    FlockStore.removeOnCreateListener(this._onChange);
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