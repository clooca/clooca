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
    var metamodelInterface = clooca.getMetaModelInterface();
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  render: function () {
  	var rootClass = this.props.model.classes[this.props.model.root];
    return (
    	<div>
	    	<ExplorerItem model={this.props.model} class={rootClass}></ExplorerItem>
    	</div>
    );
  }
});

module.exports = ExplorerComponent;