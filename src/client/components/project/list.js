var React = require('react');
var Link = require('react-router').Link
var project = require('../../../common/core/project');

let ProjectList = React.createClass({

  getInitialState: function () {
    return {
    	projects: [],
    	createMode: false
    };
  },

  componentWillMount: function() {
  	this.refresh();
  },

  refresh: function() {
  	let setState = this.setState.bind(this);
  	project.list(clooca).then((projects)=>{
  		setState({
  			projects: projects
  		});
  	});
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  onNewProjectClicked: function() {
  	this.setState({
  		createMode: true
  	});
  },

  onCreateProjectClicked: function() {
  	var name = this.refs.name.value;
  	project.save(clooca, name, {name: name}).then(()=>{
	  	this.refresh();
	  	this.setState({
	  		createMode: false
	  	});
  	});
  },

  onCancelClicked: function() {
  	this.setState({
  		createMode: false
  	});
  },

  openSettings: function(project, e) {
  	location.hash = `/project/${project.id}/settings`;
  },

  openEditor: function(project, e) {
  	location.hash = `/project/${project.id}`;
  	e.stopPropagation();
  },

  deleteProject: function(p, e) {
  	e.stopPropagation();
  	project.delete(clooca, p.id).then(()=>{
	  	this.refresh();
  	});
  },

  render: function () {
    var self = this;
    var projectList = this.state.projects.map((project) => {
      return (<div className="projectlist-item" onClick={this.openSettings.bind(this, project)}><div className="projectlist-item-title" >{project.name}</div><a className="projectlist-item-editor" onClick={this.openEditor.bind(this, project)}>open editor</a><a className="projectlist-item-delete" onClick={this.deleteProject.bind(this, project)}>delete</a><div className="projectlist-item-clear"></div></div>)
    });

    return (
    	<div className="projectlist-wrapper">
	    	{projectList}
	    	<div>
				{this.state.createMode?
					(<div><input ref="name" type="text"/><button onClick={this.onCancelClicked}>cancel</button><button onClick={this.onCreateProjectClicked}>Create Project</button></div>):
		    		(<button onClick={this.onNewProjectClicked}>New Project</button>)
				}

	    	</div>
    	</div>
    );
  }
});

module.exports = ProjectList;