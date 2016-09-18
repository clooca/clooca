var React = require('react');
var Panel = require('./panel');

let PropertyEditor = React.createClass({

  getInitialState: function () {
    return {

    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);

    var modelInterface = clooca.getModelInterface();
    var model = modelInterface.getRawModel();
    var resourceSet = modelInterface.getResourceSet();
    model.on('change', function(f) {
      setState({
        model: f,
      });
    });
    setState({
      model: model.get('contents').first(),
      resourceSet: resourceSet
    });
    this.props.propertyEditor.on('select', function(object) {
      setState({
        model: object
      });
      return true;
    });
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  render: function () {
    let content = (<div/>);
    if(this.state.model) {
      content = (<Panel model={this.state.model} resourceSet={this.state.resourceSet}></Panel>);
    }
    return (
      <div>
      {content}
      </div>
    );
  }
});

module.exports = PropertyEditor;