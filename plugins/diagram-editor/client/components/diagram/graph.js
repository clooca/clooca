var React = require('react');
var GNode = require('./gnode');
var Cursor = require('./cursor');

var DRAG_MOVE = 1;

let Graph = React.createClass({

  getInitialState: function () {
    return {
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
    if(!this.props.model || !this.props.diagram) return(<div/>);
    var model = this.props.model;
    var diagram = this.props.diagram;
    console.log(diagram);
    let nodes = diagram.get('nodes');
    let gnodes = nodes.map( (node)=>{return node;} ).reduce((acc, node) => {
      let metaElement = node.get('metaElement');
      let containFeature = node.get('containFeature');
      console.log(acc, node, containFeature);
      return acc.concat(model.get(containFeature.get('name') || 'classes').map(function(_class) {
        return _class.get('name')
      }));
    }, []);
  	var gnodeElems = gnodes.map(function(id) {
  		return (<GNode key={"gnode-"+id} name={id}></GNode>);
  	});
    return (
      <div><svg width="600" height="480"><g>{gnodeElems}</g></svg></div>
    );
  }
});

module.exports = Graph;