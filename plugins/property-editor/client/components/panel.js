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
  	console.log(eStructuralFeatures);
	var containments = eStructuralFeatures.map((meta) => {
		return (<FormItem key={'form-'+meta.get('name')} item={this.props.model.get(meta.get('name'))} meta={meta}></FormItem>);
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