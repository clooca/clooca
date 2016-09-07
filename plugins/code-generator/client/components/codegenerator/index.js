var React = require('react');
var generate = require('../../gen');

let CodeGeneratorComponent = React.createClass({

  getInitialState: function () {
    return {

    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    setState({
      code: generate()
    });
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  render: function () {
    return (
    	<div>
    		{this.state.code}
    	</div>
    );
  }
});

module.exports = CodeGeneratorComponent;