var React = require('react');
var AbstractGNode = require('./gnode');

let GNode = React.createClass({
  mixins: [AbstractGNode],
  render: function () {
    let node = this.props.node;
    var transform = "translate("+(this.state.x+100)+","+(this.state.y+50)+")"
    return (
      <g transform={transform}>
      <ellipse onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseMove}
      onMouseOut={this.onMouseOut} onMouseOver={this.onMouseOver} onMouseUp={this.onMouseUp}
      rx="100" ry="50" style={{"fill":"rgb(255,255,250)","strokeWidth":3,"stroke":"rgb(0,0,0)"}} ></ellipse>
      <text x="-50" y="5">{node.get('name')}</text>
      </g>
    );
  }
});

module.exports = GNode;