const React = require('react');
const ReactDOM = require('react-dom');

const Graph =require('./components/graph');





document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Graph level={20} />,
    document.getElementById('main'));
});
