var React = require('react');
var transformer = require('../../transformer');

let ExplorerItem = React.createClass({

  getInitialState: function () {
    return {
      hidden: false
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
    let cc = clooca.getCC();
    cc.request('clooca', 'modal', {
      isOpenAddContainmentModal: true,
      model: this.props.item,
      resourceSet: this.props.resourceSet
    }).then((_settings) => {
    });
  },

  changeMode: function() {
    this.setState({
      hidden: !this.state.hidden
    });
  },

  select: function() {
    clooca.getCC().request('property', 'selectObject', this.props.item).then(() => {

    });
  },

  render: function () {
    let resourceSet = this.props.resourceSet;
  	var offset = this.props.depth || 0;
  	var style = {
  		"marginLeft": offset+"px"
  	}
    var item = this.props.item;
    var items = transformer.transformPart(item);
    /*
    var ExplorerItems = this.props.item.children.map(function(child) {
      return (<ExplorerItem key={child.name} depth={offset+12} item={child}></ExplorerItem>)
    });*/

  	var ExplorerItems = items.reduce(function(components, children) {
      return components.concat(children.map(function(child) {
        return (<ExplorerItem key={child.get('name')} depth={offset+12} item={child} resourceSet={resourceSet}></ExplorerItem>)
      }))
  	}, []);

    return (
    	<div style={style}>
        <div className="tree-item">
          <div className={this.state.hidden?'tree-item-head tree-item-head-hidden':'tree-item-head tree-item-head-show'} onClick={this.changeMode}></div>
          <div className="tree-item-title" onClick={this.select}>{item.get('name')}</div>
          <div className="tree-item-add" onClick={this.addInstance}>+</div>
        </div>
	    	<div>{(!this.state.hidden)?(ExplorerItems):([])}</div>
    	</div>
    );
  }
});

module.exports = ExplorerItem;