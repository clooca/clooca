var React = require('react');
var Resource = require('./resource');
var transformer = require('../../transformer');

let ExplorerComponent = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    var modelInterface = clooca.getModelInterface();
    var resourceSet = modelInterface.getResourceSet();
    modelInterface.on('model.change', function(resource) {
      setState({
        resource: resource,
        resourceSet: resourceSet
      });
    });
    setState({
      resource: modelInterface.getCurrentModel(),
      resourceSet: resourceSet
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
      {this.state.resource?(<Resource resource={this.state.resource} resourceSet={this.state.resourceSet}></Resource>):
      (<div></div>)}
      </div>
    );
  }
});

module.exports = ExplorerComponent;