var React = require('react');

let Resources = React.createClass({

  getInitialState: function () {
    return {
    	resources: []
    };
  },

  componentWillMount: function() {
  	var setState = this.setState.bind(this);
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  componentWillReceiveProps: function(nextProps) {
  },

  onChange: function(e) {
  	let onSelect = this.props.onSelect;
  	if(onSelect) {
  		onSelect(e.target.value);
  	}
  },

  summary: function(uri) {
    return uri.substr(0, 6) + '...' + uri.substr(uri.length-12);
  },

  render: function () {
    var loaded = clooca.getModelInterface().getLoadedList();
  	var options = loaded.map((loaded)=>{
  		return (<option key={loaded.uri} value={loaded.uri}>{this.summary(loaded.uri)}</option>);
  	});
    return (
    	<select onChange={this.onChange}>{options}</select>
    );
  }
});

module.exports = Resources;