var React = require('react');

let Panel = React.createClass({

  getInitialState: function () {
    return {
    	tabItems: []
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
    return (
	    	<iframe className="core-iframe" src={"/plugins/"+this.props.plugin+"/html"}></iframe>
    );
  }
});

module.exports = Panel;