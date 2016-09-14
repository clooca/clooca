var React = require('react');
var ReactDom = require('react-dom');

let FormList = React.createClass({

  getInitialState: function () {
    return {

    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
    //this.refreshState(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    //this.refreshState(nextProps);
  },

  refreshState: function(props) {
    let meta = props.meta;

    let value = '';
    if(meta.get('eType').get('name') == 'EString') {
      value = props.parent.get(props.childName);
    }else if(meta.get('eType').get('name') == 'ENumber') {
      value = props.parent.get(props.childName);
    }else if(meta.get('eType').get('name') == 'EBoolean') {
      value = props.parent.get(props.childName);
    }else{
      let item = props.parent.get(props.childName);
      if(item) {
        if(Array.isArray(item)) {
          value = item.map((i)=>{
            return i.get('name');
          }).join(',');
        }else if(item.at) {
        }else{
          console.log(item);
          value = item.get('name');
        }
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
  	let list = this.props.list;
	let itemComponents = list.map((i)=>{
	  	console.log(i.get('name'));
		return (<div>{i.get('name')}</div>);
	});

    return (
    	<div>{itemComponents}</div>
    );
  }
});

module.exports = FormList;