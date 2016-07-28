const React = require('react');
const ReactDOM = require('react-dom');
const Graph =require('./components/graph');

const Scroll = require('react-scroll');
const Link = Scroll.Link;
const Element = Scroll.Element;

const App = React.createClass({
  getInitialState() {
    return ({level: 1, game: true, solvable: false, unsolvable: false})
  },

  componentDidMount() {
    window.onscroll = this.scrollHandler;
  },

  scrollHandler() {
    const height = $(window).height();
    if (window.pageYOffset >= 0 && window.pageYOffset < height * 0.5) {
      this.setState({game: true, unsolvable: false, solvable: false});
    } else if (window.pageYOffset >= height * 0.5 && window.pageYOffset < height * 1.5 ) {
      this.setState({game: false, unsolvable: true, solvable: false});
    } else {
      this.setState({game: false, unsolvable: false, solvable: true});
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    let level = parseInt($('#input').val());
    level = isNaN(level) ? 1 : level;
    this.setState({level: level});
  },

  render () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
              <ul className="nav navbar-nav">
                <li><Link activeClass="active" to="game" spy={true} smooth={true} duration={500}>Planarity.react</Link></li>
                <li><Link activeClass="active" to="unsolvable" spy={true} smooth={true} duration={500}>Unsolvable</Link></li>
                <li><Link activeClass="active" to="solvable" spy={true} smooth={true} duration={500}>Solvable</Link></li>
              </ul>
          </div>
        </nav>

        <Element name="game" className="element">
          <div id="game">
            <div>
              <div id="count">
                <p></p>
              </div>
              <form onSubmit={this.handleSubmit}>
                <input type="submit" className="btn btn-primary btn-xs" value="Generate Level:"/>
                <input type="number" placeholder={this.state.level} className="form-control input-sm" id="input" min="1" max="6000"/>
              </form>
            </div>
            <Graph channel="game" active={this.state.game} level={this.state.level} key={this.state.level} />
          </div>
        </Element>

        <Element name="unsolvable" className="element">
          <Graph channel="unsolvable" active={this.state.unsolvable} level={-1} />
        </Element>

        <Element name="solvable" className="element">
          <Graph channel="solvable" active={this.state.solvable} level={50} />
        </Element>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />,
    document.getElementById('main'));
});
