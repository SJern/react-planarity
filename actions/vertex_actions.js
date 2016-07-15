const AppDispatcher = require('../dispatcher/dispatcher');

const VertexActions = {
  updateVertex(vertex) {
    AppDispatcher.dispatch({
      actionType: "UPDATE_VERTEX",
      vertex: vertex
    });
  },
  storeVerticesAndPairs(vertices, pairs) {
    AppDispatcher.dispatch({
      actionType: "STORE_VERTICES_AND_PAIRS",
      vertices: vertices,
      pairs: pairs
    });
  }
};

module.exports = VertexActions;
