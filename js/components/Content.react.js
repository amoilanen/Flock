var React = require('react');

var Content = React.createClass({

  render: function() {
    return (
      <div className="content">
        <div className="logo">
         <span>Flock</span>
         <span className="subtitle">events</span>
        </div>
      </div>
    );
  }
});

module.exports = Content;