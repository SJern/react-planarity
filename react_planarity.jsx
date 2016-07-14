const React = require('react');
const ReactDOM = require('react-dom');

const SVGComponent = React.createClass({
    render: function() {
        return (
          <div>
            <svg {...this.props}>{this.props.children}</svg>
          </div>
        );
    }
});

var Circle = React.createClass({

  getInitialState: function () {
    return {
      pos: {
        x: this.props.cx,
        y: this.props.cy
      },
      dragging: false,
      rel: null
    }
  },

  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },

  onMouseDown: function (e) {

    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - this.state.pos.x,
        y: e.pageY - this.state.pos.y
      }
    })
    e.stopPropagation()
    e.preventDefault()
  },
  onMouseUp: function (e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  },
  onMouseMove: function (e) {
    if (!this.state.dragging) return
    let newX = e.pageX - this.state.rel.x, newY = e.pageY - this.state.rel.y;
    if (newX > 500) {
      newX = 500;
    } else if (newX < 0) {
      newX = 0;
    }
    if (newY > 500) {
      newY = 500;
    } else if (newY < 0) {
      newY = 0;
    }
    this.setState({
      pos: {
        x: newX,
        y: newY
      }
    })
    e.stopPropagation()
    e.preventDefault()
  },


    render: function() {
        return (<circle onMouseDown={this.onMouseDown} cx={this.state.pos.x} cy={this.state.pos.y} r="15">{this.props.children}</circle>);
    }
});


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <SVGComponent height="500" width="500">
      <Circle cx="50" cy="50" />
    </SVGComponent>,
    document.getElementById('main'));
});
