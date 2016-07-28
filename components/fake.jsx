const React = require('react');

const Fake = React.createClass({

  componentDidMount() {
    if (this.props.channel === "game") {
      console.log(`${this.props.channel} is adding listener`);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.active) {
      console.log(`${this.props.channel} is adding listener`);
    } else {
      console.log(`${this.props.channel} is removing listener`);
    }
  },


  render() {
    return (
      <div className="fake-box" id={this.props.channel}>
      </div>
    );
  }

});


module.exports = Fake;
