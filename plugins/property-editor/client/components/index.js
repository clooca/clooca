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
    modelInterface.on('update', function(e) {
      var model = e.model.get('contents').first();
      setState({
        model: model
      });
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
      content = (<Panel model={this.state.model}></Panel>);
    }
    return (
      <div>
      {content}
      </div>
    );
  }
});

module.exports = PropertyEditor;