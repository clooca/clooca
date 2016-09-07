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
    var model = clooca.modelInterface.getRawModel().get('contents').first();
    var gnodes = model.get('classes').map(function(_class) {
      return _class.get('name')
    });
  	var gnodeElems = gnodes.map(function(id) {
  		return (<GNode name={id}></GNode>);
  	});
    return (
      <div><svg width="600" height="480"><g>{gnodeElems}</g></svg></div>
    );
  }
});

module.exports = Graph;