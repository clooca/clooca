var React = require('react');
var GNode = require('./gnode');
var GConn = require('./gconn');
var Cursor = require('./cursor');
var store = require('../../store/editor');
var selectorAction = require('../../actions/selector');

selectorAction.register(store);

var DRAG_MOVE = 1;

let Graph = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  componentWillMount: function() {
    store.observe((editor)=>{
      this.setState({
        selected: editor.selected,
        rubberband: editor.rubberband
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
    if(!this.props.model || !this.props.diagram) return(<div/>);
    var model = this.props.model;
    var diagram = this.props.diagram;
    //console.log(diagram);
    let nodes = diagram.get('nodes');
    let connections = diagram.get('connections').map( (connection)=>{return connection;} );
    let gnodes = nodes.map( (node)=>{return node;} ).reduce((acc, node) => {
      let metaElement = node.get('metaElement');
      let containFeature = node.get('containFeature');
      //console.log(acc, node, containFeature);
      return acc.concat(model.get(containFeature.get('name') || 'classes').map(function(_class) {
        return _class;
      }));
    }, []);
  	var gnodeElems = gnodes.map(function(node) {
      let id = node.get('name');
  		return (<GNode key={"gnode-"+id} id={id} node={node}></GNode>);
  	});
    let gconnections = gnodes.map(function(node) {
      return connections.reduce((acc, connection) => {
        let metaElement = connection.get('metaElement');
        let containFeature = connection.get('containFeature');
        return acc.concat(node.get(containFeature.get('name')).map(function(_class) {
          return _class;
        }));
      }, []);
    });
    let ftat_gconnections = Array.prototype.concat.apply([], gconnections);
    var gconnElems = ftat_gconnections.map(function(conn) {
      let id = conn.get('name');
      return (<GConn key={"gconn-"+id} id={id} conn={conn}></GConn>);
    });
    if(this.state.selected) {
      var selected = gnodes.filter((node)=>{
        return this.state.selected == node.get('name');
      })[0]
    }
    if(this.state.rubberband) {
    }
    return (
      <div><svg width="600" height="480">
        <g>{gconnElems}</g><g>{gnodeElems}</g><g>{selected?(<Cursor selected={selected}/>):''}</g>
      </svg></div>
    );
  }
});

module.exports = Graph;