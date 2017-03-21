var React = require('react');
var ExplorerItem = require('./item');
var transformer = require('../../transformer');

let ResourceComponent = React.createClass({

  getInitialState: function () {
    return {
      model: []
    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);

    this.props.resource.on('add remove change', (f)=>{
      setState({
        model: this.props.resource.get('contents')
      });
    });
	setState({
		model: this.props.resource.get('contents')
	});
  },

  componentWillReceiveProps: function(nextProps) {
    var setState = this.setState.bind(this);
    console.log(nextProps);
    //this.props.resource.off('add remove change');
    nextProps.resource.on('add remove change', (f)=>{
      setState({
        model: nextProps.resource.get('contents')
      });
    });
	setState({
		model: nextProps.resource.get('contents')
	});
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },
  
  addObject: function() {
    clooca.getPlugin('clooca').request('modal', {
      isOpenAddObjectModal: true,
      uri: this.props.resource.get('uri')
    }).then((_settings) => {
    });
  },

  render: function () {
    let content = (<div/>);
    if(this.state.model && this.state.model.size() > 0) {
      content = this.state.model.map((model, index)=>{
        return (<ExplorerItem key={index} item={model} resourceSet={this.props.resourceSet} modelExplorer={this.props.modelExplorer}></ExplorerItem>)
      });
    }else{
      content = (<div><a style={{cursor:'pointer', color:'#333'}} onClick={this.addObject}>Add New Object</a></div>);
    }
    return (
      <div>
      {content}
      </div>
    );
  }
});

module.exports = ResourceComponent;