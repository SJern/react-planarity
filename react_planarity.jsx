const React = require('react');
const ReactDOM = require('react-dom');

var MyComponent = React.createClass({
  render() {
    return(
      <div>Hello World</div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<MyComponent />, document.getElementById('main'));
});
