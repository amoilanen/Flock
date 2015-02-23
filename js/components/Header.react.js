var React = require('react');
var FlockActions = require('../actions/FlockActions');

var Header = React.createClass({

  _onClick: function() {
    FlockActions.create();
  },

  render: function() {
    return (
      <header>
        <button onClick={this._onClick}>+</button>
      </header>
    );
  }
});

module.exports = Header;