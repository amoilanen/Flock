var React = require('react');

var Button = React.createClass({

  render: function() {
    var icon;
    var className = 'fl-button';
    var onClick = this.props.disabled ? function() {}: this.props.onClick;

    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    if (this.props.disabled) {
      className = className + ' disabled';
    }
    if (this.props.iconClassName) {
      /* jshint ignore:start */
      icon = (<i className={this.props.iconClassName}></i>);
      /* jshint ignore:end */
    }
    return (
      /* jshint ignore:start */
      <span className={className} onClick={onClick}>
        {icon}
        <span className="fl-button-label">{this.props.label}</span>
      </span>
      /* jshint ignore:end */
    );
  }
});

module.exports = Button;