var React = require('react');
var ExplorerItem = require('./item');
var transformer = require('../../transformer');

let ExplorerComponent = React.createClass({

  getInitialState: function () {
    return {
      model: []
    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    var modelInterface = clooca.getModelInterface();
    var model = modelInterface.getRawModel();
    var resourceSet = modelInterface.getResourceSet();

    model.on('add change', function(f) {
      setState({
        model: modelInterface.getRawModel().get('contents')
      });
    });
    setState({
      model: model.get('contents'),
      resourceSet: resourceSet
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
      content = this.state.model.map((model)=>{
        return (<ExplorerItem item={model} resourceSet={this.state.resourceSet}></ExplorerItem>)
      });
    }else{
      content = (<div><a style={{cursor:'pointer', color:'#fff'}} onClick={this.addObject}>最初のオブジェクトを作成する。</a></div>);
    }
    return (
      <div>
      {content}
      </div>
    );
  }
});

module.exports = ExplorerComponent;