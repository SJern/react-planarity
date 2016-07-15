const React = require('react');
const VertexStore = require('../stores/vertex_store');

const Edge = React.createClass({
  getInitialState() {
    return {
      x1: this.props.x1,
      y1: this.props.y1,
      x2: this.props.x2,
      y2: this.props.y2
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
  },

  render: function() {
    let x1 = this.state.x1,
        y1 = this.state.y1,
        x2 = this.state.x2,
        y2 = this.state.y2;

    return (<line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" stroke="orange" />);
  }
});

module.exports = Edge;
