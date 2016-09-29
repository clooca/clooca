var React = require('react');

var ToolPallet = require('./tool');
var GraphComponent = require('./graph');

let DiagramEditor = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    var modelInterface = clooca.getModelInterface();
    var model = modelInterface.getRawModel();
    var resourceSet = modelInterface.getResourceSet();
    let diagram = resourceSet.elements('Diagram')[0]
    let metaElement = diagram.get('metaElement');

    model.on('change', function(f) {
      setState({
        model: model.get('contents').first(),
      });
    });
    setState({
      model: model.get('contents').first(),
      diagram: diagram
    });
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
    		<ToolPallet tools={[]}/>
    		<GraphComponent model={this.state.model} diagram={this.state.diagram}/>
    	</div>
    );
  }
});

module.exports = DiagramEditor;