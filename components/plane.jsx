const React = require('react');

const Plane = React.createClass({
  render: function() {
    return (<div className="game"><svg {...this.props}>{this.props.children}</svg></div>);
  }
});

module.exports = Plane;
