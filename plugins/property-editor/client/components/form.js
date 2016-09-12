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
  	let value = props.parent.get(props.childName);
  	if(this.refs.input) {
	  	var input = ReactDom.findDOMNode(this.refs.input);
	  	input.value = value;
	}
},

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  updateProperties: function(e) {
  	this.props.parent.set(this.props.childName, e.target.value);
  },

  render: function () {
  	let meta = this.props.meta;
  	let item = this.props.parent.get(this.props.childName);
  	var label = meta.get('name');
  	var inputElem = (<input ref="input" type="text" />)
  	if(meta.get('eType').get('name') == 'EString') {
  		inputElem = (<input ref="input" onChange={this.updateProperties} type="text" value={this.state.value}/>);
  	}else if(meta.get('eType').get('name') == 'ENumber') {
  		inputElem = (<input ref="input" type="number" value={this.state.value}/>);
  	}
    return (
    	<div><span>{label}</span>{inputElem}</div>
    );
  }
});

module.exports = Panel;