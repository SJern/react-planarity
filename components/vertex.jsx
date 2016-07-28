const React = require('react');
const VertexActions = require('../actions/vertex_actions');

const Vertex = React.createClass({
  getInitialState() {
    return {
      pos: {
        x: this.props.cx,
        y: this.props.cy
      },
      dragging: false,
      delta: null
    };
  },

  componentDidUpdate(_, prevState) {
    if (this.state.dragging && !prevState.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && prevState.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  },

  onMouseDown(e) {
    this.setState({
      dragging: true,
      delta: {
        x: e.pageX - this.state.pos.x,
        y: e.pageY - this.state.pos.y
      }
    });
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseUp(e) {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  },

  onMouseMove(e) {
    if (!this.state.dragging) return;
    let newX = e.pageX - this.state.delta.x, newY = e.pageY - this.state.delta.y;
    if (newX > 900) {
      newX = 900;
    } else if (newX < 0) {
      newX = 0;
    }
    if (newY > 600) {
      newY = 600;
    } else if (newY < 0) {
      newY = 0;
    }
    this.setState({ pos: {x: newX, y: newY} });
    VertexActions.updateVertex({
      channel: this.props.channel,
      index: this.props.index,
      x: this.state.pos.x,
      y: this.state.pos.y
    });
    e.stopPropagation();
    e.preventDefault();
  },

  render() {
    return (<circle onMouseDown={this.onMouseDown} cx={this.state.pos.x} cy={this.state.pos.y} r="15" fill="#0cf" stroke="black" />);
  }
});

module.exports = Vertex;
