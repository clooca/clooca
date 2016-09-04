var React = require('react');

var PluginItem = require('../plugin/item');

let CoreComponent = React.createClass({

  getInitialState: function () {
    return {
    	plugin: "explorer"
    };
  },

  componentWillMount: function() {
  	var setState = this.setState.bind(this);
    var modelInterface = clooca.getModelInterface();
    var metamodelInterface = clooca.getMetaModelInterface();
    modelInterface.on('update', function(model) {
      console.log(model);
      setState({
        model: model
      });
    });
    metamodelInterface.on('update', function(metamodel) {
      setState({
        metamodel: metamodel
      });
    });
    metamodelInterface.load( require('../../../common/assets/classdiagram/metamodel.json') );
    modelInterface.load( require('../../../common/assets/classdiagram/model.json') );

  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  changePlugin: function(pluginName) {
    console.log(pluginName);
  	this.setState({
  		plugin: pluginName
  	});
  },

  render: function () {
    var self = this;
    var modelInterface = clooca.getModelInterface();
    var metamodelInterface = clooca.getMetaModelInterface();
  	var content = (<div className="loading-animation"/>);
    var pluginList = this.props.pluginNames.map(function(pluginName) {
      return (<PluginItem pluginName={pluginName} onClick={self.changePlugin} ></PluginItem>)
    })
    var Component = clooca.getPluginComponent(this.state.plugin);
    if(Component) {
      content = (<Component
        model={this.state.model}
        metamodel={this.state.metamodel}></Component>)
    }

    return (
    	<div>
	    	<div className="core-pluginmenu">
          {pluginList}
	    	</div>
	    	<div className="core-main">
	    		{content}
	    	</div>
    	</div>
    );
  }
});

module.exports = CoreComponent;