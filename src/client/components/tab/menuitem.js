var React = require('react');

let TabMenuItem = React.createClass({

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

  onClick: function() {
  	this.props.onClick({
  		
  	});
  },

  render: function () {
  	return (<div className="core-tabitem" onClick={this.onClick}>{this.props.title}</div>);
  }
});

module.exports = Tab;