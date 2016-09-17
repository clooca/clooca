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
		<li  className="core-header-menuitem" style={{float:"left", "margin":0, padding:'0 3px 0 3px', "cursor":"pointer"}} onClick={this.props.onSelect}>{this.props.title}</li>
    );
  }
});

module.exports = MenuItem;