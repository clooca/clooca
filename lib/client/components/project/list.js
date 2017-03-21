'use strict';

var React = require('react');
var Link = require('react-router').Link;
var project = require('../../../common/core/project');

var ProjectList = React.createClass({
  displayName: 'ProjectList',


  getInitialState: function getInitialState() {
    return {
      projects: [],
      createMode: false
    };
  },

  componentWillMount: function componentWillMount() {
    this.refresh();
  },

  refresh: function refresh() {
    var setState = this.setState.bind(this);
    console.log(clooca);
    project.list(clooca).then(function (projects) {
      setState({
        projects: projects
      });
    });
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  onNewProjectClicked: function onNewProjectClicked() {
    this.setState({
      createMode: true
    });
  },

  onCreateProjectClicked: function onCreateProjectClicked() {
    var _this = this;

    var name = this.refs.name.value;
    project.save(clooca, name, { name: name }).then(function () {
      _this.refresh();
      _this.setState({
        createMode: false
      });
    });
  },

  onCancelClicked: function onCancelClicked() {
    this.setState({
      createMode: false
    });
  },

  openSettings: function openSettings(project, e) {
    location.hash = '/project/' + project.id + '/settings';
  },

  openEditor: function openEditor(project, e) {
    location.hash = '/project/' + project.id;
    e.stopPropagation();
  },

  deleteProject: function deleteProject(p, e) {
    var _this2 = this;

    e.stopPropagation();
    project.delete(clooca, p.id).then(function () {
      _this2.refresh();
    });
  },

  render: function render() {
    var _this3 = this;

    var self = this;
    var projectList = this.state.projects.map(function (project) {
      return React.createElement(
        'div',
        { className: 'projectlist-item', onClick: _this3.openSettings.bind(_this3, project) },
        React.createElement(
          'div',
          { className: 'projectlist-item-title' },
          project.name
        ),
        React.createElement(
          'a',
          { className: 'projectlist-item-editor', onClick: _this3.openEditor.bind(_this3, project) },
          'open editor'
        ),
        React.createElement(
          'a',
          { className: 'projectlist-item-delete', onClick: _this3.deleteProject.bind(_this3, project) },
          'delete'
        ),
        React.createElement('div', { className: 'projectlist-item-clear' })
      );
    });

    return React.createElement(
      'div',
      { className: 'projectlist-wrapper' },
      projectList,
      React.createElement(
        'div',
        null,
        this.state.createMode ? React.createElement(
          'div',
          null,
          React.createElement('input', { ref: 'name', type: 'text' }),
          React.createElement(
            'button',
            { onClick: this.onCancelClicked },
            'cancel'
          ),
          React.createElement(
            'button',
            { onClick: this.onCreateProjectClicked },
            'Create Project'
          )
        ) : React.createElement(
          'button',
          { onClick: this.onNewProjectClicked },
          'New Project'
        )
      )
    );
  }
});

module.exports = ProjectList;
//# sourceMappingURL=list.js.map
