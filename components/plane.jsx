const React = require('react');

const Plane = React.createClass({
  render: function() {
    return (<svg {...this.props}>{this.props.children}</svg>);
  }
});

module.exports = Plane;
