const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;

const VertexStore = new Store(AppDispatcher);

let _vertex;

VertexStore.vertex = function() {
  return Object.assign({}, _vertex);
};

function updateVertex(vertex) {
  _vertex = vertex;
  VertexStore.__emitChange();
}

VertexStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case "UPDATE_VERTEX":
      updateVertex(payload.vertex);
  }
};

module.exports = VertexStore;
