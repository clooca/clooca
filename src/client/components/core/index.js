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
    modelInterface.on('update', function(e) {
      console.log(e);
      setState({
        model: e.model
      });
    });
    modelInterface.loadMetaModel( require('../../../common/assets/classdiagram/metamodel.json') ).then(function(content) {
      return modelInterface.loadModel( require('../../../common/assets/classdiagram/model.json') );
    }).then(function(content) {
      console.log(content)
    }).catch(function(err){
      console.error(err);
    });
    
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
    if(this.state.plugin) {
      content = (<iframe className="core-iframe" src={"/plugins/"+this.state.plugin+"/html"}></iframe>)
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