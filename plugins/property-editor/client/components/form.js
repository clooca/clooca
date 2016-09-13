var React = require('react');
var ReactDom = require('react-dom');
var FormItem = require('./form');

let Panel = React.createClass({

  getInitialState: function () {
    return {

    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    this.refreshState(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.refreshState(nextProps);
  },

  refreshState: function(props) {
    let meta = props.meta;

    let value = '';
    if(meta.get('eType').get('name') == 'EString') {
      value = props.parent.get(props.childName);
    }else if(meta.get('eType').get('name') == 'ENumber') {
      value = props.parent.get(props.childName);
    }else{
      if(props.parent.get(props.childName)) {
        value = props.parent.get(props.childName).get('name');
      }else{
        value = 'none';
      }
    }
    this.setState({
      value: value
    });
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  updateProperties: function(e) {
    this.setState({
      value: e.target.value
    })
  	this.props.parent.set(this.props.childName, e.target.value);
  },

  updateRelation: function(event) {
    let meta = this.props.meta;
    let elements = this.props.resourceSet.elements(meta.get('eType').get('name'));
    let target = elements.filter((elem) => {
      return elem.get('name') == event.target.value;
    })[0];
    this.setState({
      value: event.target.value
    });
    this.props.parent.set(this.props.childName, target);
  },

  render: function () {
  	let meta = this.props.meta;
  	let item = this.props.parent.get(this.props.childName);
  	var label = meta.get('name');
    var refName = 'input-' + label;
  	var inputElem = (<div />)
  	if(meta.get('eType').get('name') == 'EString') {
  		inputElem = (<input onChange={this.updateProperties} type="text" value={this.state.value}/>);
  	}else if(meta.get('eType').get('name') == 'ENumber') {
  		inputElem = (<input onChange={this.updateProperties} type="number" value={this.state.value}/>);
  	}else{
      let elements = this.props.resourceSet.elements(meta.get('eType').get('name'));
      let options = elements.map((e) => {
        return (<option>{e.get('name')}</option>);
      });
      inputElem = (<select onChange={this.updateRelation} value={this.state.value}>{options}</select>);
    }
    return (
    	<div><span>{label}</span>{inputElem}</div>
    );
  }
});

module.exports = Panel;