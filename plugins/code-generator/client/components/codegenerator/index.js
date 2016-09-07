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
      files: generate()
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
    		{this.state.files.map(function(file) {
          return (<div>{file}</div>);
        })}
    	</div>
    );
  }
});

module.exports = CodeGeneratorComponent;