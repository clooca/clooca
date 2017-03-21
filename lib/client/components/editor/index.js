'use strict';

var React = require('react');

var project = require('../../../common/core/project');
var pluginLoader = require('../../pluginLoader');

var PluginItem = require('../plugin/item');
var TabComponent = require('../tab');
var PluginPanel = require('../plugin/panel');
var Header = require('./header');
var SplitPane = require('react-split-pane');
var TabAction = require('../../actions/tab');
var ModalAction = require('../../actions/modal');
var EditorStore = require('../../store/editor');
var AlertModal = require('../modal/alert');

TabAction.register(EditorStore);
ModalAction.register(EditorStore);

var CoreComponent = React.createClass({
  displayName: 'CoreComponent',


  getInitialState: function getInitialState() {
    return {
      pluginNames: [],
      isOpen: false,
      errorMessage: ''
    };
  },

  componentWillMount: function componentWillMount() {
    var setState = this.setState.bind(this);
    console.log(this.props.params);
    project.load(clooca, this.props.params.projectId).then(function () {
      return pluginLoader();
    }).then(function (pluginNames) {
      setState({
        pluginNames: pluginNames
      });
    }).catch(function (err) {
      setState({
        isOpen: true,
        errorMessage: err.message
      });
    });

    EditorStore.observe(function (data) {
      setState({
        editorSettings: data
      });
    });
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  onCloseAlert: function onCloseAlert() {
    this.setState({
      isOpen: false,
      errorMessage: ''
    });
  },

  changePlugin: function changePlugin(pluginName) {
    console.log(pluginName);
    this.setState({
      plugin: pluginName
    });
  },

  render: function render() {
    var self = this;
    var content = React.createElement('div', { className: 'loading-animation' });
    return React.createElement(
      'div',
      null,
      React.createElement(Header, { pluginNames: this.state.pluginNames, editorSettings: this.state.editorSettings }),
      React.createElement(
        SplitPane,
        { split: 'vertical', minSize: 150, defaultSize: 200 },
        React.createElement(
          'div',
          null,
          React.createElement(PluginPanel, { plugin: 'explorer' })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(TabComponent, { editorSettings: this.state.editorSettings })
        ),
        React.createElement('div', { className: 'core-main' })
      ),
      React.createElement(AlertModal, { isOpen: this.state.isOpen, title: "Model Loading Error", message: this.state.errorMessage, onClose: this.onCloseAlert })
    );
  }
});

module.exports = CoreComponent;
//# sourceMappingURL=index.js.map
