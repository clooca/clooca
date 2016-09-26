var React = require('react');

let ToolList = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  render: function () {
  	let tools = this.props.tools;
  	let toolDoms = tools.map((tool) => {
  		return (<div>{tool.name}</div>);
  	});
    return (
    	<div>{toolDoms}</div>
    );
  }
});

module.exports = ToolList;