var React = require('react');
var GNode = require('./gnode-rect');
var GNodeElipse = require('./gnode-elipse');
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

  onClick : function(e) {
    console.log('clicked svg');
    if (window.isSelectMode) {
      return;
    }
    if (window.isAssociationMode) {
      return;
    }
    if (window.nodeDragging) {
      return;
    }
    var name;
    if (window.nodeIsElipse) {
      name = 'IndexGroup'
    } else {
      name = 'Index'
    }
    var key = 'indexes';
    var modelInterface = clooca.getModelInterface();
    var resourceSet = modelInterface.getResourceSet();
    var eClass = resourceSet.elements('EClass').filter((eClass) => {
      return eClass.get('name') == name;
    })[0];
    var model = this.props.model;
    var classInstance = eClass.create(
      {
        name:new Date().getTime(),
        x:e.pageX,
        y:e.pageY
      }
    );
    model.get(key).add(classInstance);
  },

  render: function () {
    if(!this.props.model || !this.props.diagram) return(<div/>);
    var model = this.props.model;
    var diagram = this.props.diagram;
    let nodes = diagram.get('nodes');
    let connections = diagram.get('connections').map( (connection)=>{return connection;} );
    let nodeList = nodes.map( (node)=>{return node;} );
    let gnodes = nodeList.reduce((acc, node) => {
      let metaElement = node.get('metaElement');
      let containFeature = node.get('containFeature');
      let cfName = containFeature.get('name');
      let cfInstances = model.get(cfName || 'classes');
      let cfInstanceList = cfInstances.map(function(_class) {
        return _class;
      });
      return acc.concat(cfInstanceList);
    }, []);
  	var gnodeElems = gnodes.map(function(node) {
      let id = node.get('name');
      let eClassName = node.eClass.get('name');
      if (eClassName === 'Index') {
        return (<GNode key={"gnode-"+id} id={id} node={node}></GNode>);
      } else {
        return (<GNodeElipse key={"gnode-"+id} id={id} node={node}></GNodeElipse>);
      }
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
      <div><svg width="600" height="480" onClick={this.onClick} onContextMenu={this.onContextMenu}>
        <g>{gconnElems}</g><g>{gnodeElems}</g><g>{selected?(<Cursor selected={selected}/>):''}</g>
      </svg></div>
    );
  }
});

module.exports = Graph;