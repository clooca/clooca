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
    var resourceSet = modelInterface.getResourceSet();
    setState({
      resourceSet: resourceSet
    });
    this.props.propertyEditor.ready();
    this.props.propertyEditor.on('select', function(model) {
      setState({
        model: model
      });
      model.on('change', function(f) {
        console.log(f);
        setState({
          model: model
        });
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