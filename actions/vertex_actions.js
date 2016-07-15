const AppDispatcher = require('../dispatcher/dispatcher');

const VertexActions = {
  updateVertex(vertex) {
    AppDispatcher.dispatch({
      actionType: "UPDATE_VERTEX",
      vertex: vertex
    });
  }
};

module.exports = VertexActions;
