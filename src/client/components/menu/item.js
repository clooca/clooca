var React = require('react');

let MenuItem = React.createClass({

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
		<li  className="core-header-menuitem" onClick={this.props.onSelect}>{this.props.children}</li>
    );
  }
});

module.exports = MenuItem;