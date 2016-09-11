var React = require('react');
var ExplorerItem = require('./item');
var transformer = require('../../transformer');

let ExplorerComponent = React.createClass({

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
      content = (<ExplorerItem item={this.state.model}></ExplorerItem>);
    }
    return (
      <div>
      {content}
      </div>
    );
  }
});

module.exports = ExplorerComponent;