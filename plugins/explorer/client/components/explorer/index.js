var React = require('react');
var ExplorerItem = require('./item');

let ExplorerComponent = React.createClass({

  getInitialState: function () {
    return {

    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    var modelInterface = clooca.getModelInterface();
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  render: function () {
    var model = clooca.modelInterface.getRawModel().get('contents').first();
    return (
    	<div>
	    	<ExplorerItem item={model}></ExplorerItem>
    	</div>
    );
  }
});

module.exports = ExplorerComponent;