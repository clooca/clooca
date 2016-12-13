var React = require('react');
var ReactDom = require('react-dom');
var FormListItem = require('./formListItem');

let FormList = React.createClass({

  getInitialState: function () {
    return {
      addForm: false
    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  addHandler: function() {
    this.setState({
      addForm: true
    });
  },

  addElementHandler: function(element) {
    this.props.parent.add(element);
    this.cancelHandler();
  },

  cancelHandler: function() {
    this.setState({
      addForm: false
    });
  },

  render: function () {
  	let meta = this.props.meta;
  	let itemComponents = this.props.parent.map((value, i)=>{
      let containerName = value.eContainer.get('name');
      return (<div>{containerName+':'+value.get('name')}</div>);
      //return (<FormListItem key={'formlist-'+i} resourceSet={this.props.resourceSet} parent={this.props.parent} childIndex={i} meta={meta}></FormListItem>);
  	});
    if(this.state.addForm) {
      return (
        <div>
          <div>{itemComponents}</div>
          <FormListItem key={'formlist'} resourceSet={this.props.resourceSet} meta={meta} addElementHandler={this.addElementHandler}></FormListItem>
          <div><button onClick={this.cancelHandler}>Cancel</button></div>
        </div>
      );
    }else{
      return (
        <div>
          <div>{itemComponents}</div>
          <div><button onClick={this.addHandler}>Add</button></div>
        </div>
      );
    }
  }
});

module.exports = FormList;