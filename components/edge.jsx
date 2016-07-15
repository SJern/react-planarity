const React = require('react');

const Edge = React.createClass({
  render: function() {
    let x1 = this.props.x1,
        y1 = this.props.y1,
        x2 = this.props.x2,
        y2 = this.props.y2;

    return (<line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" stroke="orange" />);
  }
});

module.exports = Edge;
