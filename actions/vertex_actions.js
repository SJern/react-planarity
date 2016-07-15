const AppDispatcher = require('../dispatcher/dispatcher');

const VertexActions = {
  updateVertex(vertex) {
    AppDispatcher.dispatch({
      actionType: "UPDATE_VERTEX",
      vertex: vertex
    });
  },
  storePairs(pairs) {
    AppDispatcher.dispatch({
      actionType: "STORE_PAIRS",
      pairs: pairs
    });
  }
};

module.exports = VertexActions;
