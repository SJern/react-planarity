const AppDispatcher = require('../dispatcher/dispatcher');

const VertexActions = {
  updateVertex(vertex) {
    AppDispatcher.dispatch({
      actionType: "UPDATE_VERTEX",
      vertex: vertex
    });
  },
  storePairs(channel, pairs) {
    AppDispatcher.dispatch({
      actionType: "STORE_PAIRS",
      channel: channel,
      pairs: pairs
    });
  }
};

module.exports = VertexActions;
