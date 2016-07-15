const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;

const VertexStore = new Store(AppDispatcher);

let _vertex, _pairs;

VertexStore.vertex = function() {
  return Object.assign({}, _vertex);
};

VertexStore.pairs = function() {
  return _pairs;
};

function updateVertex(vertex) {
  _vertex = vertex;
  for (let i = 0, len = _pairs.length; i < len; i++) {
    for (let j = 0; j < 2; j++) {
      if (_pairs[i][j].index === vertex.index) {
        _pairs[i][j] = vertex;
      }
    }
  }
  VertexStore.__emitChange();
}

function storePairs(pairs) {
  _pairs = pairs;
}

VertexStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "UPDATE_VERTEX":
      updateVertex(payload.vertex);
      break;
    case "STORE_PAIRS":
      storePairs(payload.pairs);
  }
};

module.exports = VertexStore;
