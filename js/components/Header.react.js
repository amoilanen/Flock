var React = require('react');
var FlockActions = require('../actions/FlockActions');

var Header = React.createClass({

  _onClick: function() {
    FlockActions.create();
  },

  render: function() {
    return (
      <header>
        <span className="header-button" onClick={this._onClick}>
          <i className="fa fa-2x fa-plus-square-o"></i>
          <span className="header-button-label">New</span>
        </span>
      </header>
    );
  }
});

module.exports = Header;