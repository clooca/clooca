var React = require('react');
var generate = require('../../gen');

let CodeGeneratorComponent = React.createClass({

  getInitialState: function () {
    return {

    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    var modelInterface = clooca.getModelInterface();
    var model = modelInterface.getRawModel();
    model.on('change', function(f) {
      setState({
        files: generate(model)
      });
    });
    setState({
      files: generate(model)
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
    		{this.state.files.map(function(file, i) {
          return (<div key={"cg"+i}>{file}</div>);
        })}
    	</div>
    );
  }
});

module.exports = CodeGeneratorComponent;