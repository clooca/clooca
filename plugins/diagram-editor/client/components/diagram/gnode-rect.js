var React = require('react');
var AbstractGNode = require('./gnode');

let GNode = React.createClass({
  mixins: [AbstractGNode],
  render: function () {
    let node = this.props.node;
    var transform = "translate("+this.state.x+","+this.state.y+")"
    return (
      <g transform={transform}>
      <rect onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseMove}
      onMouseOut={this.onMouseOut} onMouseOver={this.onMouseOver} onMouseUp={this.onMouseUp}
      width="200" height="100" style={{"fill":"rgb(255,255,250)","strokeWidth":3,"stroke":"rgb(0,0,0)"}} ></rect>
      <text x="6" y="20">{node.get('name')}</text>
      </g>
    );
  }
});

module.exports = GNode;