var React = require('react');
var Point2D = require('../../math/math2d').Point2D;
var selectorAction = require('../../actions/selector');

var DRAG_NONE = 0;
var DRAG_MOVE = 1;

let GNode = React.createClass({

  getInitialState: function () {
    return {
      x:this.props.node.get('x'),
      y:this.props.node.get('y')
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

  onClick: function() {
    console.log('click');
  },

  onMouseDown: function(e) {
    console.log('onMouseDown');
    this.offset = new Point2D(e.pageX-this.state.x, e.pageY-this.state.y);
    this.setState({
      dragMode: DRAG_MOVE
    });
    selectorAction.select(this.props.id);
  },

  onMouseMove: function(e) {
    //console.log('onMouseMove');
    if(this.state.dragMode == DRAG_MOVE) {
      //console.log( this.offset );
      var currentPos = new Point2D(e.pageX, e.pageY);
      var dd = currentPos.sub(this.offset);
      //console.log(dd);
      if(this.props.onMoved) {
        this.props.onMoved(dd);
      }
      this.setState({
        x: dd.x,
        y: dd.y
      });
      this.props.node.set('x', dd.x);
      this.props.node.set('y', dd.y);
    }

  },

  onMouseUp: function(e) {
    console.log('onMouseUp');
    if(this.state.dragMode == DRAG_MOVE) {
      
    }
    this.state.dragMode = DRAG_NONE;

  },

  onMouseEnter: function() {
    console.log('onMouseEnter');

  },

  onMouseLeave: function() {
    console.log('onMouseLeave');
    this.state.dragMode = DRAG_NONE;

  },


  onMouseOut: function() {
    console.log('onMouseOut');

  },

  onMouseOver: function() {
    console.log('onMouseOver');

  },

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