var React = require('react');

let Menu = React.createClass({

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
    return (
    	<div>
    		<ul style={{"list-style":"none", "margin":0, "padding":0}}>
        {this.props.children}
    		</ul>
        <div style={{overflow:'hidden', clear:'both'}}></div>
    	</div>
    );
  }
});

module.exports = Menu;