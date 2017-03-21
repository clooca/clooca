'use strict';

var React = require('react');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;

var Editor = require('./editor');
var ProjectList = require('./project/list');
var ProjectSettings = require('./project/settings');
var NoMatch = React.createClass({
  displayName: 'NoMatch',

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        Link,
        { to: '/projects' },
        'projects'
      )
    );
  }
});

var IndexComponent = React.createClass({
  displayName: 'IndexComponent',


  getInitialState: function getInitialState() {
    return {};
  },

  componentWillMount: function componentWillMount() {},

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  render: function render() {
    return React.createElement(
      Router,
      { history: hashHistory },
      React.createElement(Route, { path: '/projects', component: ProjectList }),
      React.createElement(Route, { path: '/project/:projectId', component: Editor }),
      React.createElement(Route, { path: '/project/:projectId/settings', component: ProjectSettings }),
      React.createElement(Route, { path: '*', component: NoMatch })
    );
  }
});

module.exports = IndexComponent;
//# sourceMappingURL=index.js.map
