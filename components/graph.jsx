const React = require('react');

const Vertex = require('./vertex');
const Plane = require('./plane');
const Edge = require('./edge');

const VertexActions = require('../actions/vertex_actions');

const k33Vertices = [
  {index: 1, x: 225, y: 200},
  {index: 2, x: 450, y: 200},
  {index: 3, x: 675, y: 200},
  {index: 4, x: 225, y: 400},
  {index: 5, x: 450, y: 400},
  {index: 6, x: 675, y: 400}
];

const k33Pairs = [
  [k33Vertices[0], k33Vertices[3]],
  [k33Vertices[0], k33Vertices[4]],
  [k33Vertices[0], k33Vertices[5]],
  [k33Vertices[1], k33Vertices[3]],
  [k33Vertices[1], k33Vertices[4]],
  [k33Vertices[1], k33Vertices[5]],
  [k33Vertices[2], k33Vertices[3]],
  [k33Vertices[2], k33Vertices[4]],
  [k33Vertices[2], k33Vertices[5]]
];

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

function verticesAndPairs(vertices, numberOfVerticesToRemove) {
  let k = 4;
  const numberOfVertices = vertices.length;
  while (true) {
    if (k * (k - 1) === 2 * numberOfVertices) break;
    k++;
  }

  let pairs = [];
  const n = k, degreeSequence = {},
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
      degreeSequence[u + 1] = (degreeSequence[u + 1] || 0) + 1;
      degreeSequence[v + 1] = (degreeSequence[v + 1] || 0) + 1;
      let pair = [u, v].sort((a, b) => a - b).map(pairIdx => vertices[pairIdx]);
      pairs.push(pair);
    }
  }

  const unwantedsLibrary = {};
  let added = 0;
  for (let vertex in degreeSequence) {
    if (added === numberOfVerticesToRemove) break;
    if( degreeSequence.hasOwnProperty(vertex) ) {
      if (degreeSequence[vertex] === 2) {
        unwantedsLibrary[vertex] = true;
        added += 1;
      }
    }
  }
  pairs = pairs.filter(pair => {
    return !pair.some(vertex => unwantedsLibrary[vertex.index]);
  });
  const desiredVertices = vertices.filter((vertex, i) => {
    return !unwantedsLibrary[i + 1];
  });
  return [pairs, desiredVertices];
}

const Graph = React.createClass({
  getInitialState() {
    let desiredVerticesAndPairs;
    if (this.props.level === -1) {
      desiredVerticesAndPairs = [k33Pairs, k33Vertices];
    } else {
      const desiredNumber = this.props.level + 5;
      let k = 4;
      while (true) {
        if (k * (k - 1) >= 2 * desiredNumber) break;
        k++;
      }
      const n = k,
            numberOfVerticesForN = n*(n - 1)/2,
            vertices = makeRandomVertices(numberOfVerticesForN),
            numberOfVerticesToRemove = (numberOfVerticesForN - desiredNumber);
      desiredVerticesAndPairs = verticesAndPairs(vertices, numberOfVerticesToRemove);
    }
    return {
      vertices: desiredVerticesAndPairs[1],
      pairs: desiredVerticesAndPairs[0]
    };
  },

  componentDidMount() {
    VertexActions.storePairs(this.props.channel, this.state.pairs);
  },

  render: function() {
    return (
      <Plane height="600" width="900">
        <g>{this.state.pairs.map((pair, idx) => <Edge active={this.props.active} channel={this.props.channel} indices={pair.map(vertex => vertex.index)} idx={idx} key={idx} x1={pair[0].x} y1={pair[0].y} x2={pair[1].x} y2={pair[1].y} />)}</g>
        <g>{this.state.vertices.map(vertex => <Vertex channel={this.props.channel} key={vertex.index} index={vertex.index} cx={vertex.x} cy={vertex.y} />)}</g>
      </Plane>
    );
  }
});

module.exports = Graph;
