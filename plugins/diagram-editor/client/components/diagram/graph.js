var React = require('react');
var GNode = require('./gnode');

var DRAG_MOVE = 1;

let Graph = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    var modelInterface = clooca.getModelInterface();
    modelInterface.on('update', function(e) {
      setState({
        resources: e.model
      });
    });
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  render: function () {
    if(!this.state.resources) return(<div/>);
    var model = this.state.resources.get('contents').first();
    var gnodes = model.get('classes').map(function(_class) {
      return _class.get('name')
    });
  	var gnodeElems = gnodes.map(function(id) {
  		return (<GNode key={"gnode-"+id} name={id}></GNode>);
  	});
    return (
      <div><svg width="600" height="480"><g>{gnodeElems}</g></svg></div>
    );
  }
});

module.exports = Graph;