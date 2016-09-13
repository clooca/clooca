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

  getStructureFeatures: function() {
  	var eStructuralFeatures = this.props.model.eClass.get('eStructuralFeatures');
  	var containments = eStructuralFeatures.filter((meta) => {
      return !meta.get('containment');
    }).map((meta) => {
  		return (<FormItem key={'form-'+meta.get('name')} resourceSet={this.props.resourceSet} parent={this.props.model} childName={meta.get('name')} meta={meta}></FormItem>);
  	});
  	return containments;
  },

  render: function () {
    return (
    	<div>{this.getStructureFeatures()}</div>
    );
  }
});

module.exports = Panel;