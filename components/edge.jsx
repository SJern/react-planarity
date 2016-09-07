const React = require('react');
const VertexStore = require('../stores/vertex_store');

function intersects(p0X, p0Y, p1X, p1Y, p2X, p2Y, p3X, p3Y) {
  if ((p0X === p2X && p0Y === p2Y) || (p0X === p3X && p0Y === p3Y)) {
    return false;
  } else if ((p1X === p2X && p1Y === p2Y) || (p1X === p3X && p1Y === p3Y)) {
    return false;
  }

  let s1X, s1Y, s2X, s2Y;
  s1X = p1X - p0X;
  s1Y = p1Y - p0Y;
  s2X = p3X - p2X;
  s2Y = p3Y - p2Y;

  let u, t;
  u = (-s1Y * (p0X - p2X) + s1X * (p0Y - p2Y)) / (-s2X * s1Y + s1X * s2Y);
  t = ( s2X * (p0Y - p2Y) - s2Y * (p0X - p2X)) / (-s2X * s1Y + s1X * s2Y);

  return (u >= 0 && u <= 1 && t >= 0 && t <= 1);
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
    if (this.props.channel === "game") {
      this.vertexListener = VertexStore.addListener(this.handleChange);
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      if (!this.vertexListener) {
        this.vertexListener = VertexStore.addListener(this.handleChange);
      }
    } else {
      if (this.vertexListener) {
        this.vertexListener.remove();
        this.vertexListener = undefined;
      }
    }
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
    const intersected = VertexStore.pairs(this.props.channel).some((pair, i) => {
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
    const notDone = $('#game .intersected').length;
    $("#count p").replaceWith(`<p>${notDone} line crossing(s) detected.${notDone ? "" : "<br/>Good job!"}</p>`);
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
