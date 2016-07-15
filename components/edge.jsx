const React = require('react');
const VertexStore = require('../stores/vertex_store');

function intersects(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
  if ((p0_x === p2_x && p0_y === p2_y) || (p0_x === p3_x && p0_y === p3_y)) {
    return false;
  } else if ((p1_x === p2_x && p1_y === p2_y) || (p1_x === p3_x && p1_y === p3_y)) {
    return false;
  }

  let s1_x, s1_y, s2_x, s2_y;
  s1_x = p1_x - p0_x;
  s1_y = p1_y - p0_y;
  s2_x = p3_x - p2_x;
  s2_y = p3_y - p2_y;

  let s, t;
  s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
  t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

  return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}

const Edge = React.createClass({
  getInitialState() {
    return {
      x1: this.props.x1,
      y1: this.props.y1,
      x2: this.props.x2,
      y2: this.props.y2,
      intersected: true
    };
  },
  componentDidMount() {
    this.vertexListener = VertexStore.addListener(this.handleChange);
  },
  componentWillUnmount() {
    this.vertexListener.remove();
  },
  handleChange() {
    const vertex = VertexStore.vertex();
    const idx = this.props.indices.indexOf(vertex.index);
    if (idx === 0) {
      this.setState({ x1: vertex.x, y1: vertex.y });
    } else if (idx === 1) {
      this.setState({ x2: vertex.x, y2: vertex.y });
    }
    const intersected = VertexStore.pairs().some((pair, i) => {
      if (i === this.props.idx) {
        return false;
      }
      return intersects(this.state.x1, this.state.y1, this.state.x2, this.state.y2, pair[0].x, pair[0].y, pair[1].x, pair[1].y);
    });
    if (intersected && !this.state.intersected) {
      this.setState({intersected: intersected});
    } else if (!intersected && this.state.intersected) {
      this.setState({intersected: intersected});
    }
    const notDone = $('.intersected').length;
    $("#count p").replaceWith(`<p>${notDone} line crossing(s) detected.${notDone ? "" : " Good job!"}</p>`);
  },

  render: function() {
    let x1 = this.state.x1,
        y1 = this.state.y1,
        x2 = this.state.x2,
        y2 = this.state.y2;

    return (<line className={this.state.intersected ? "intersected" : ""} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" stroke={this.state.intersected ? "red" : "orange"} />);
  }
});

module.exports = Edge;
