var React = require('react');
var Point2D = require('../../math/math2d').Point2D;

let GConn = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  componentWillMount: function() {
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  render: function () {
    let conn = this.props.conn;
    let source = conn.get('source');
    let target = conn.get('target');
    let startX = source.get('x') + 100;
    let startY = source.get('y') + 50;
    let xx = Number(target.get('x')) - Number(source.get('x'));
    let yy = Number(target.get('y')) - Number(source.get('y'));
    var transform = `translate(${startX},${startY})`;
    return (
      <g transform={transform} stroke="black" strokeWidth="3">
              <path d={`M 0 0 L ${xx} ${yy}`}/>
      </g>
    );
  }
});

module.exports = GConn;