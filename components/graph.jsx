const React = require('react');

const Vertex = require('./vertex');
const Plane = require('./plane');
const Edge = require('./edge');

const VertexActions = require('../actions/vertex_actions');

function makeRandomVertices(num) {
  const vertices = [];
  const angles = [];
  let angle;
  for (let i = 0; i < num; i++) {
    do {
      angle = Math.random() * Math.PI*2;
    } while (angles.indexOf(angle) >= 0);
    angles.push(angle);
    let x = Math.cos(angle)*260 + 450;
    let y = Math.sin(angle)*260 + 300;
    vertices.push({index: i + 1, x: x, y: y});
  }
  return vertices;
}

function pairIndex(p, q, n) {
  if (p >= q) return pairIndex(q, p, n);
  return (p*(2*n - p - 1)/2) + q - p;
}

// basically solving for x: a1*x + b1 = a2*x + b2
// l1 = [a1, b1]
function intersection(l1, l2) {
  return (l2[1] - l1[1]) / (l1[0] - l2[0]);
}

function unparalleledSlopes(n) {
  const slopes = [];
  let slope;
  for (let i = 0; i < n; i++) {
    do {
      slope = Math.random() * 200 - 100;
    } while (slopes.indexOf(slope) >= 0);
    slopes.push(slope);
  }
  return slopes;
}

function pairsOfVertices(vertices) {
  let k = 4;
  const numberOfVertices = vertices.length;
  while (true) {
    if (k * (k - 1) === 2 * numberOfVertices) break;
    k++;
  }
  const pairs = [], n = k,
        lines = unparalleledSlopes(n).map(slope => [slope, Math.random()]);

  for (let i = 0; i < n; i++) {
    let otherLines = []
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        otherLines.push(j);
      }
    }

    otherLines.sort((l1, l2) => {
      return intersection(lines[i], lines[l1]) - intersection(lines[i], lines[l2]);
    });

    for (let j = 0; j < n - 2; j++) {
      let u = pairIndex(i, otherLines[j], n) - 1,
          v = pairIndex(i, otherLines[j + 1], n) - 1;
      let pair = [u, v].sort((a, b) => a - b).map(pairIdx => vertices[pairIdx]);
      pairs.push(pair);
    }
  }
  return pairs;
}

const Graph = React.createClass({
  getInitialState() {
    const n = this.props.level + 3;
    const numberOfVertices = n*(n - 1)/2;
    return {vertices: makeRandomVertices(numberOfVertices)};
  },

  componentDidMount() {
    VertexActions.storePairs(this.pairs);
    const notDone = $('.intersected').length;
    $("#count p").replaceWith(`<p>${notDone} line crossing(s) detected.${notDone ? "" : " Good job!"}</p>`);
  },

  render: function() {
    this.pairs = pairsOfVertices(this.state.vertices);
    return (
      <Plane height="600" width="900">
        <g>{this.pairs.map((pair, idx) => <Edge indices={pair.map(vertex => vertex.index)} idx={idx} key={idx} x1={pair[0].x} y1={pair[0].y} x2={pair[1].x} y2={pair[1].y} />)}</g>
        <g>{this.state.vertices.map(vertex => <Vertex key={vertex.index} index={vertex.index} cx={vertex.x} cy={vertex.y} />)}</g>
      </Plane>
    );
  }
});

module.exports = Graph;
