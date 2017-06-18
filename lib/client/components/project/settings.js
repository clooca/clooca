'use strict';

var React = require('react');
var Link = require('react-router').Link;

var project = require('../../../common/storage/project');

var ProjectSettings = React.createClass({
  displayName: 'ProjectSettings',


  getInitialState: function getInitialState() {
    return {
      data: ""
    };
  },

  componentWillMount: function componentWillMount() {
    var _this = this;

    var setState = this.setState.bind(this);
    project.loadProject(clooca.getStorage(), this.props.params.projectId).then(function (data) {
      _this.refs.settings.value = JSON.stringify(data, null, 2);
      setState({
        data: data
      });
    });
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  save: function save() {
    var settings = JSON.parse(this.refs.settings.value);
    project.saveProject(clooca.getStorage(), this.props.params.projectId, settings).then(function () {}).catch(function (err) {
      console.error(err);
    });
  },

  onNameChange: function onNameChange(e) {
    var data = this.state.data;
    data.name = e.target.value;
    this.setState({
      data: data
    });
  },

  onRequiredChange: function onRequiredChange(index, e) {
    var data = this.state.data;
    data.required[index].uri = e.target.value;
    this.setState({
      data: data
    });
  },

  onModelsChange: function onModelsChange(index, e) {
    var data = this.state.data;
    data.models[index].uri = e.target.value;
    this.setState({
      data: data
    });
  },

  onPluginsChange: function onPluginsChange(key, e) {
    var data = this.state.data;
    data.plugin[key] = JSON.parse(e.target.value);
    this.setState({
      data: data
    });
  },

  render: function render() {
    var required = this.state.data.required || [];
    var models = this.state.data.models || [];
    var plugins = this.state.data.plugin || {};
    return React.createElement(
      'div',
      { className: 'settings-wrapper' },
      React.createElement(
        'div',
        null,
        React.createElement(
          Link,
          { to: '/projects' },
          '\u2190Return'
        )
      ),
      React.createElement(
        'div',
        null,
        React.createElement('textarea', { cols: '50', rows: '16', ref: 'settings' })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick: this.save },
          'Save'
        )
      )
    );
  }
});

module.exports = ProjectSettings;
//# sourceMappingURL=settings.js.map
