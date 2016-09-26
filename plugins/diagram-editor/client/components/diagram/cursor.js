var React = require('react');

var ToolPallet = require('./tool');
var GraphComponent = require('./graph');

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

  render: function () {
    var transform = "translate("+this.state.x+","+this.state.y+")"
    return (
    	<g transform={transform}>
 			<rect width="300" height="100" style={{"fill":"none","strokeWidth":3,"stroke":"rgb(100,150,100)"}} ></rect>
    	</g>
    );
  }
});

module.exports = Cursor;