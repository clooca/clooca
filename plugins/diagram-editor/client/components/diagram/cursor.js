var React = require('react');

var ToolPallet = require('./tool');
var GraphComponent = require('./graph');
var selectorAction = require('../../actions/selector');

let Cursor = React.createClass({

  getInitialState: function () {
    return {
    	x: 0,
    	y: 0
    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  onMouseDown: function() {
    selectorAction.rubberband(this.props.selected);

  },

  render: function () {
    let target = this.props.selected;
    let x = target.get('x') || 0;
    let y = target.get('y') || 0;
    let w = 200;
    let h = 100;
    let size = 20;
    let offset = size + 2;
    var transform = "translate("+x+","+y+")"
    return (
    	<g transform={transform}>
      <rect x={-offset} y={-offset} width={size} height={size} style={{"fill":"#7F7","strokeWidth":2,"stroke":"rgb(100,150,100)"}} ></rect>
      <rect x={-offset} y={h} width={size} height={size} style={{"fill":"#7F7","strokeWidth":2,"stroke":"rgb(100,150,100)"}} ></rect>
      <rect x={w} y={-offset} width={size} height={size} style={{"fill":"#7F7","strokeWidth":2,"stroke":"rgb(100,150,100)"}} ></rect>
      <rect x={w} y={h} width={size} height={size} style={{"fill":"#7F7","strokeWidth":2,"stroke":"rgb(100,150,100)"}} ></rect>
    	</g>
    );
    //  <rect x={w} y={(h-size)/2} width={size} height={size} style={{"fill":"#f77","strokeWidth":2,"stroke":"rgb(100,150,100)"}} onMouseDown={this.onMouseDown}></rect>
  }
});

module.exports = Cursor;