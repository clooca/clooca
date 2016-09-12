var React = require('react');
var FormItem = require('./form');

let Panel = React.createClass({

  getInitialState: function () {
    return {

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

  updateProperties: function() {

  },

  render: function () {
  	let meta = this.props.meta;
  	let item = this.props.item;
  	console.log(item);
  	var label = meta.get('name');
  	var inputElem = (<input type="text" />)
  	if(meta.get('eType').get('name') == 'EString') {
  		inputElem = (<input onChange={this.updateProperties} type="text" value={item}/>);
  	}else if(meta.get('eType').get('name') == 'ENumber') {
  		inputElem = (<input type="number" value={item}/>);
  	}
    return (
    	<div><span>{label}</span>{inputElem}</div>
    );
  }
});

module.exports = Panel;