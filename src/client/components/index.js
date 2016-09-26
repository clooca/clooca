var React = require('react');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var Editor = require('./editor');
var ProjectList = require('./project/list');
var ProjectSettings = require('./project/settings');
var NoMatch = React.createClass({
	render: function() {
		return (<div><Link to="/projects">projects</Link></div>);
	}
});

let IndexComponent = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  componentWillMount: function() {
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  render: function () {
    return (
	  <Router history={hashHistory}>
		<Route path="/projects" component={ProjectList}>
		</Route>
		<Route path="/project/:projectId" component={Editor}/>
		<Route path="/project/:projectId/settings" component={ProjectSettings}/>
		<Route path="*" component={NoMatch}/>
	  </Router>
    );
  }
});

module.exports = IndexComponent;