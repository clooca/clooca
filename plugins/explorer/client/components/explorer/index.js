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
      var resourceSet = e.model.get('resourceSet');
      setState({
        model: model,
        resourceSet: resourceSet
      });
    });
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  addObject: function() {
    let cc = clooca.getCC();
    cc.request('clooca', 'modal', {
      isOpenAddObjectModal: true
    }).then((_settings) => {
    });
  },

  render: function () {
    let content = (<div/>);
    if(this.state.model) {
      content = (<ExplorerItem item={this.state.model} resourceSet={this.state.resourceSet}></ExplorerItem>);
    }else{
      content = (<div><a style={{cursor:'pointer'}} onClick={this.addObject}>最初のオブジェクトを作成する。</a></div>);
    }
    return (
      <div>
      {content}
      </div>
    );
  }
});

module.exports = ExplorerComponent;