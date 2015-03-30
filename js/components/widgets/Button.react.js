var React = require('react');

var Button = React.createClass({

  render: function() {
    var className = 'fl-button';

    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    return (
      /* jshint ignore:start */
      <span className={className} onClick={this.props.onClick}>
        <i className={this.props.iconClassName}></i>
        <span className="fl-button-label">{this.props.label}</span>
      </span>
      /* jshint ignore:end */
    );
  }
});

module.exports = Button;