const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;

const VertexStore = new Store(AppDispatcher);

let _vertex, _pairs, _unsolvable, _solvable;

VertexStore.vertex = function() {
  return Object.assign({}, _vertex);
};

VertexStore.pairs = function(channel) {
  if (channel === "game") {
    return _pairs;
  } else if (channel === "unsolvable") {
    return _unsolvable;
  } else {
    return _solvable;
  }
};

function updateVertex(vertex) {
  _vertex = vertex;
  let pairs;
  if (vertex.channel === "game") {
    pairs = _pairs;
  } else if (vertex.channel === "unsolvable") {
    pairs = _unsolvable;
  } else {
    pairs = _solvable;
  }
  for (let i = 0, len = pairs.length; i < len; i++) {
    for (let j = 0; j < 2; j++) {
      if (pairs[i][j].index === vertex.index) {
        pairs[i][j] = vertex;
      }
    }
  }
  VertexStore.__emitChange();
}

function storePairs(channel, pairs) {
  if (channel === "game") {
    _pairs = pairs;
  } else if (channel === "unsolvable") {
    _unsolvable = pairs;
  } else {
    _solvable = pairs;
  }
}

VertexStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "UPDATE_VERTEX":
      updateVertex(payload.vertex);
      break;
    case "STORE_PAIRS":
      storePairs(payload.channel, payload.pairs);
  }
};

module.exports = VertexStore;
