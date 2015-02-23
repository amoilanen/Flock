var Footer = require('./Footer.react');
var Content = require('./Content.react');
var Header = require('./Header.react');
var React = require('react');
var FlockStore = require('../stores/FlockStore');

var FlockApp = React.createClass({

  _onCreate: function() {
    console.log("New flock created");
  },

  componentDidMount: function() {
    FlockStore.addOnCreateListener(this._onCreate);
  },

  componentWillUnmount: function() {
    FlockStore.removeOnCreateListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
});

module.exports = FlockApp;