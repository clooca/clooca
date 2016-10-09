var React = require('react');
var Link = require('react-router').Link
var Repository = require('../../../common/core/repository');

let ModelList = React.createClass({

  getInitialState: function () {
    return {
    	models: [],
    	createMode: false
    };
  },

  componentWillMount: function() {
  	this.refresh();
  },

  refresh: function() {
  	let setState = this.setState.bind(this);
  	Repository.list(clooca).then((models)=>{
  		setState({
  			models: models
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
    var self = this;
    var modelList = this.state.models.map((model) => {
      return (<div className="projectlist-item"><div className="projectlist-item-title" >{model.name}</div><div className="projectlist-item-clear"></div></div>)
    });

    return (
    	<div className="projectlist-wrapper">
	    	{modelList}
    	</div>
    );
  }
});

module.exports = ModelList;