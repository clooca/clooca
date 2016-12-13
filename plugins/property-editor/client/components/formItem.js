var React = require('react');
var ReactDom = require('react-dom');
var FormList = require('./formList');

let FormItem = React.createClass({

  getInitialState: function () {
    return {

    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
  },

  componentWillReceiveProps: function(nextProps) {
  },

  getValue: function(props) {
    let meta = props.meta;
    let parent = props.parent;
    let childName = props.childName;
    let childIndex = props.childIndex;
    let eType = meta.get('eType').get('name');

    let value = '';
    var simpleETypes = ['EString', 'EInt', 'EBoolean', 'EDouble', 'EDate'];
    if(simpleETypes.indexOf(eType) >= 0) {
      if(childName) {
        value = parent.get(childName);
      }else{
        value = parent.at(childIndex);
      }
    }else{
      let item = null;
      if(childName) {
        item = parent.get(childName);
      }else{
        item = parent.at(childIndex);
      }
      if(item) {
        if(Array.isArray(item)) {
          value = item.map((i)=>{
            return i.get('name');
          }).join(',');
        }else if(item.at) {
        }else if(item.get) {
          value = item.get('name');
        }else{
          value = item;
        }
      }else{
        value = 'none';
      }
    }
    return value;
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  updateProperties: function(eTypeName, e) {
    let newValue = null;
    if(eTypeName == 'EBoolean') {
      let currentValue = this.props.parent.get(this.props.childName);
      newValue = !currentValue;
    }else{
      newValue = e.target.value;
    }
    /*
    this.setState({
      value: newValue
    });
    */
  	this.props.parent.set(this.props.childName, newValue);
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
    let currentValue = this.getValue(this.props);
  	let meta = this.props.meta;
  	let item = this.props.parent.get(this.props.childName);
  	var label = meta.get('name');
  	var inputElem = (<div />)
    if(meta.get('upperBound') == 1) {
      let eTypeName = meta.get('eType').get('name');
      let updateProperties = this.updateProperties.bind(this, eTypeName);
      if(eTypeName == 'EString') {
        inputElem = (<input onChange={updateProperties} type="text" value={currentValue}/>);
      }else if(eTypeName == 'EInt') {
        inputElem = (<input onChange={updateProperties} type="number" value={currentValue}/>);
      }else if(eTypeName == 'EBoolean') {
        inputElem = (<input onChange={updateProperties} type="checkbox" checked={currentValue}/>);
      }else if(eTypeName == 'EDouble') {
      }else if(eTypeName == 'EDate') {
      }else{
        let elements = this.props.resourceSet.elements(meta.get('eType').get('name'));
        let options = elements.map((e) => {
          let containerName = e.eContainer.get('name');
          return (<option value={e.get('name')}>{containerName + ':' + e.get('name')}</option>);
        });
        inputElem = (<select onChange={this.updateRelation} value={currentValue}>{options}</select>);
      }
    }else{
      inputElem = (<FormList resourceSet={this.props.resourceSet} meta={meta} parent={item}></FormList>);
    }
    return (
    	<div style={{overflow:'hidden', clear:'hidden',borderBottom:'1px solid #777'}}><span style={{float:'left',width:'200px'}}>{label}</span><div style={{float:'left'}}>{inputElem}</div></div>
    );
  }
});

module.exports = FormItem;