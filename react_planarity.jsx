const React = require('react');
const ReactDOM = require('react-dom');
const Graph =require('./components/graph');

const Scroll = require('react-scroll');
const Link = Scroll.Link;
const Element = Scroll.Element;
const scroll = Scroll.animateScroll;

import GoMarkGithub from 'react-icons/lib/go/mark-github';

const App = React.createClass({
  getInitialState() {
    return ({level: 6, game: true, solvable: false, unsolvable: false})
  },

  componentDidMount() {
    scroll.scrollTo(0.5);
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
                <li><a className="github" href="https://github.com/SJern" target="_blank"><GoMarkGithub/> Steven Cheong 2016</a></li>
              </ul>
          </div>
        </nav>

        <Element name="game" className="element">
          <div id="game">
            <div className="directions">
              <div id="count">
                <p>A graph is planar if it can be drawn in a plane without edges crossing. Go ahead and geek it out. Solve these puzzles by eliminating any crossing of edges.</p>
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
          <div className="fun-facts">
            <div className="directions">
              <p>This is a <i>K</i><sub>3,3</sub>. It might look easy but it's in fact impossible to solve due to its nonplanarity. Don't take my word for it. Try it yourself.</p>
            </div>
            <Graph channel="unsolvable" active={this.state.unsolvable} level={-1} />
          </div>
        </Element>

        <Element name="solvable" className="element">
          <div className="fun-facts">
            <div className="directions">
              <p>This one here is solvable due to its planarity. (Just don't ask me to solve it.) All graphs in all levels generated on this page (except for <i>K</i><sub>3,3</sub>) are planar, thus solvable. Choose any level to play and have fun!</p>
            </div>
            <Graph channel="solvable" active={this.state.solvable} level={100} />
          </div>
        </Element>
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />,
    document.getElementById('main'));
});
