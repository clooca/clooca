var React = require('react');
var transformer = require('../../transformer');
var CreateModal = require('../modal/create');

let ExplorerItem = React.createClass({

  getInitialState: function () {
    return {

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

  toArray: function(obj) {
  	if(!obj) return [];
  	return Object.keys(obj).map(function(k) {
  		return obj[k];
  	});
  },

  addInstance: function() {
    this.setState({
      isOpenCreateModal: true
    });
    //console.log(model, model.eClass);
    //model.get("classes").add();

    /*
  	var target = this.props.class;
    var modelInterface = clooca.getModelInterface();
    var metamodelInterface = clooca.getMetaModelInterface();

  	metamodelInterface.getInstance(target.type).then(function(metaClass) {
  		var association = Object.keys(metaClass.relations)[0];
	  	modelInterface.createInstance(target.id, association, {});
  	}).catch(function(err) {
  		console.error(err.stack);
  	})
    */
  },

  onCloseCreateModal: function(){
    this.setState({
      isOpenCreateModal: false
    });
  },

  render: function () {
  	var offset = this.props.depth || 0;
  	var style = {
  		"marginLeft": offset+"px"
  	}
    var item = this.props.item;
    var items = transformer.transformPart(item);

  	var ExplorerItems = items.reduce(function(components, children) {
      return components.concat(children.map(function(child) {
        return (<ExplorerItem key={child.get('name')} depth={offset+12} item={child}></ExplorerItem>)
      }))
  	}, []);

    return (
    	<div style={style}>
        <div className="tree-item">
          <div className="tree-item-head">></div>
          <div className="tree-item-title">{item.get('name')}</div>
          <div className="tree-item-add" onClick={this.addInstance}>+</div>
        </div>
	    	<div>{ExplorerItems}</div>
        <CreateModal isOpenCreateModal={this.state.isOpenCreateModal} onClose={this.onCloseCreateModal} model={this.props.item}></CreateModal>
    	</div>
    );
  }
});

module.exports = ExplorerItem;