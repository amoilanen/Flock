var React = require('react');

var Content = React.createClass({

  render: function() {
    return (
      /* jshint ignore:start */
      <div className="content">
        <div className="logo">
         <span>Flock</span>
         <span className="subtitle">events</span>
        </div>
      </div>
      /* jshint ignore:end */
    );
  }
});

module.exports = Content;