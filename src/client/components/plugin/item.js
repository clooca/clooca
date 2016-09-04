var React = require('react');



let PluginItem = React.createClass({

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
  	if(this.props.onClick) this.props.onClick(this.props.pluginName)
  },

  render: function () {
    return (
    	<div className="plugin-item" onClick={this.onClick}>
    	{this.props.pluginName}
    	</div>
    );
  }
});

module.exports = PluginItem;