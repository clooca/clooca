var React = require('react');

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

  onClick: function() {
  	var target = this.props.class;
    var modelInterface = clooca.getModelInterface();
    var metamodelInterface = clooca.getMetaModelInterface();

    console.log(target.type);
  	metamodelInterface.getInstance(target.type).then(function(metaClass) {
  		var association = Object.keys(metaClass.relations)[0];
	  	modelInterface.createInstance(target.id, association, {});
  	}).catch(function(err) {
  		console.error(err.stack);
  	})
  },

  render: function () {
  	var model = this.props.model;
  	var classes = model.classes;
  	var offset = this.props.depth || 0;
  	var style = {
  		"marginLeft": offset+"px"
  	}
  	var ExplorerItems = this.toArray(this.props.class.relations).map(function(relation) {
  		return classes[relation.id];
  	}).map(function(_class) {
  		return (<ExplorerItem key={_class.id} depth={offset+12} model={model} class={_class}></ExplorerItem>)
  	})

    return (
    	<div style={style}>
	    	<div onClick={this.onClick}>{this.props.class.properties.name}</div>
	    	<div>{ExplorerItems}</div>
    	</div>
    );
  }
});

module.exports = ExplorerItem;