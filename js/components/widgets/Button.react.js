var React = require('react');

var Button = React.createClass({

  render: function() {
    var className = 'fl-button';
    var icon;

    if (this.props.className) {
      className = className + ' ' + this.props.className;
    }
    if (this.props.iconClassName) {
      /* jshint ignore:start */
      icon = (<i className={this.props.iconClassName}></i>);
      /* jshint ignore:end */
    }
    return (
      /* jshint ignore:start */
      <span className={className} onClick={this.props.onClick}>
        {icon}
        <span className="fl-button-label">{this.props.label}</span>
      </span>
      /* jshint ignore:end */
    );
  }
});

module.exports = Button;