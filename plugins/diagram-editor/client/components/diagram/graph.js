var React = require('react');
var GNode = require('./gnode');

var DRAG_MOVE = 1;

let Graph = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  componentWillMount: function() {
  	//viewer mode
  	//resizable
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  render: function () {
  	var gnodes = Object.keys(this.props.model.classes);
  	var gnodeElems = gnodes.map(function(id) {
  		return (<GNode name={id}></GNode>);
  	});
    return (
      <div><svg width="600" height="480"><g>{gnodeElems}</g></svg></div>
    );
  }
});

module.exports = Graph;