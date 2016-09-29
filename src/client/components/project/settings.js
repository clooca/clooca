var React = require('react');
var Link = require('react-router').Link;

var project = require('../../../common/storage/project');



let ProjectSettings = React.createClass({

  getInitialState: function () {
    return {
      data: ""
    };
  },

  componentWillMount: function() {
  	let setState = this.setState.bind(this);
    project.loadProject(clooca.getStorage(), this.props.params.projectId).then((data)=>{
    	this.refs.settings.value = JSON.stringify(data, null, 2);
      setState({
        data: data
      });
    });

  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  save: function() {
  	var settings = JSON.parse(this.refs.settings.value);
    project.saveProject(clooca.getStorage(), this.props.params.projectId, settings).then(()=>{
    }).catch((err)=>{
      console.error(err);
    });
  },

  onNameChange: function(e) {
    var data = this.state.data;
    data.name = e.target.value;
    this.setState({
      data: data
    });
  },

  onRequiredChange: function(index, e) {
    var data = this.state.data;
    data.required[index].uri = e.target.value;
    this.setState({
      data: data
    });
  },

  onModelsChange: function(index, e) {
    var data = this.state.data;
    data.models[index].uri = e.target.value;
    this.setState({
      data: data
    });
  },

  onPluginsChange: function(key, e) {
    var data = this.state.data;
    data.plugin[key] = JSON.parse(e.target.value);
    this.setState({
      data: data
    });
  },

  render: function () {
    var required = this.state.data.required || [];
    var models = this.state.data.models || [];
    var plugins = this.state.data.plugin || {};
    return (
    	<div className="settings-wrapper">
    	<div><Link to="/projects">←Return</Link></div>
    	<div><textarea cols="50" rows="16" ref="settings"/></div>
    	<div><button onClick={this.save}>Save</button></div>
    	</div>
    );
      /*
      <div><input onChange={this.onNameChange} value={this.state.data.name}/></div>
      <div>{required.map((m, index)=>{return (<input onChange={this.onRequiredChange.bind(this, index)} value={m.uri}/>);})}</div>
      <div>{models.map((m, index)=>{return (<input onChange={this.onModelsChange.bind(this, index)} value={m.uri}/>);})}</div>
      <div>{Object.keys(plugins).map((key, index)=>{return (<input onChange={this.onPluginsChange.bind(this, key)} value={JSON.stringify(plugins[key])}/>);})}</div>
      */

  }
});

module.exports = ProjectSettings;