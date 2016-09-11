var React = require('react');

var PluginItem = require('../plugin/item');
var TabComponent = require('../tab');
var PluginPanel = require('../plugin/panel');
var Header = require('./header');
var SplitPane = require('react-split-pane');
var TabAction = require('../../actions/tab');
var EditorStore = require('../../store/editor');

TabAction.register(EditorStore);

let CoreComponent = React.createClass({

  getInitialState: function () {
    return {
    	plugin: "explorer"
    };
  },

  componentWillMount: function() {
  	let setState = this.setState.bind(this);
    let modelInterface = clooca.getModelInterface();
    let cc = clooca.getCC();
    let settings = null;
    cc.request('clooca', 'getSettings', {}).then((_settings) => {
      settings = _settings;
      return cc.request('clooca', 'findEcoreModel', {url: settings.metaModel.location});
    }).then((model) => {
      return modelInterface.loadMetaModel( settings.metaModel.uri, model );
    }).then(function(content) {
      return modelInterface.loadModel( require('../../../common/assets/classdiagram/model.json') );
    }).then(function(content) {
      console.log(content)
    }).catch(function(err){
      console.error(err.stack);
    });
    EditorStore.observe((data) => {
      setState({
        editorSettings: data
      });
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
  	var content = (<div className="loading-animation"/>);
    var pluginList = this.props.pluginNames.map(function(pluginName) {
      return (<PluginItem pluginName={pluginName} onClick={self.changePlugin} ></PluginItem>)
    });

    return (
    	<div>
        <Header pluginNames={this.props.pluginNames}></Header>
        <SplitPane split="vertical" minSize={150} defaultSize={200}>
          <div>
            <PluginPanel plugin="explorer"></PluginPanel>
          </div>
          <div>
            <TabComponent editorSettings={this.state.editorSettings}></TabComponent>
          </div>
          <div className="core-main">
          </div>
        </SplitPane>
    	</div>
    );
  }
});

module.exports = CoreComponent;