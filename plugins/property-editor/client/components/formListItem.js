var React = require('react');
var ReactDom = require('react-dom');

let FormListItem = React.createClass({

  getInitialState: function () {
    return {

    };
  },

  componentWillMount: function() {
    var setState = this.setState.bind(this);
  },

  componentWillReceiveProps: function(nextProps) {
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount: function() {
  },

  updateProperties: function(eTypeName, e) {
    let newValue  = e.target.value;
    this.props.addElementHandler(newValue);
  },

  updateRelation: function(event) {
    let meta = this.props.meta;
    let elements = this.props.resourceSet.elements(meta.get('eType').get('name'));
    let target = elements.filter((elem) => {
      return elem.get('name') == event.target.value;
    })[0];
    this.props.addElementHandler(target);
  },

  render: function () {
  	let item = null;
	let meta = this.props.meta;
	var label = meta.get('name');
	var inputElem = (<div />)
	var disabled = meta.get('containment');
	//if(meta.get('upperBound') == 1) {
		let eTypeName = meta.get('eType').get('name');
		let updateProperties = this.updateProperties.bind(this, eTypeName);
		if(eTypeName == 'EString') {
		  inputElem = (<input onChange={updateProperties} type="text"/>);
		}else if(eTypeName == 'EInt') {
		  inputElem = (<input onChange={updateProperties} type="number"/>);
		}else if(eTypeName == 'EBoolean') {
		  inputElem = (<input onChange={updateProperties} type="checkbox"/>);
		}else if(eTypeName == 'EDouble') {
		}else if(eTypeName == 'EDate') {
		}else{
			if(disabled) {
				return (<div>{currentValue}</div>);
			}else{
				let elements = this.props.resourceSet.elements(meta.get('eType').get('name'));
				let options = elements.map((e) => {
					let containerName = e.eContainer.get('name');
					return (<option value={e.get('name')}>{containerName + ':' + e.get('name')}</option>);
				});
				inputElem = (<select onChange={this.updateRelation}>{options}</select>);
			}
		}
	//}
	return (
	<div style={{overflow:'hidden', clear:'hidden',borderBottom:'1px solid #aaa'}}><div style={{float:'left'}}>{inputElem}</div></div>
	);

  }
});

module.exports = FormListItem;