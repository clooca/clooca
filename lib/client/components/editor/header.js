'use strict';

var React = require('react');
var Link = require('react-router').Link;
var Menu = require('../menu');
var MenuItem = require('../menu/item');
var Resources = require('./resources');
var AddTabModal = require('../modal/addTab');
var AddObjectModal = require('../modal/addObject');
var AddContainmentModal = require('../modal/addContainment');
var ImportJSONModal = require('../modal/importJSON');
var ExportJSONModal = require('../modal/exportJSON');
var TabAction = require('../../actions/tab');
var ModalAction = require('../../actions/modal');
var querystring = require('querystring');

var repository = require('../../../common/core/repository');

var Header = React.createClass({
  displayName: 'Header',


  getInitialState: function getInitialState() {
    return {
      isOpenAddTabModal: false,
      isOpenImportJSONModal: false,
      isOpenExportJSONModal: false,
      isOpenAddObjectModal: this.props.editorSettings.isOpenAddObjectModal,
      isOpenAddContainmentModal: this.props.editorSettings.isOpenAddContainmentModal
    };
  },

  componentWillMount: function componentWillMount() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      isOpenAddContainmentModal: nextProps.editorSettings.isOpenAddContainmentModal
    });
  },

  addTab: function addTab(newTab) {
    TabAction.add(newTab);
  },

  onAddTabMenuSelected: function onAddTabMenuSelected() {
    this.setState({
      isOpenAddTabModal: true
    });
  },

  onAddObjectMenuSelected: function onAddObjectMenuSelected() {
    clooca.getPlugin('clooca').request('modal', {
      isOpenAddObjectModal: true
    }).then(function () {});
  },

  onSaveMenuSelected: function onSaveMenuSelected() {
    var modelJson = clooca.getModelInterface().getModelJSON();
    repository.save(clooca, modelJson.uri, modelJson.data).then(function () {});
  },

  onImportMenuSelected: function onImportMenuSelected() {
    this.setState({
      isOpenImportJSONModal: true
    });
  },

  onExportMenuSelected: function onExportMenuSelected() {
    this.setState({
      isOpenExportJSONModal: true
    });
  },

  onCloseImportJSONModal: function onCloseImportJSONModal() {
    this.setState({
      isOpenImportJSONModal: false
    });
  },

  onCloseAddTabModal: function onCloseAddTabModal() {
    this.setState({
      isOpenAddTabModal: false
    });
  },

  onCloseAddObjectModal: function onCloseAddObjectModal() {
    ModalAction.close();
  },

  onCloseAddContainmentModal: function onCloseAddContainmentModal() {
    ModalAction.close();
  },

  onCloseExportJSONModal: function onCloseExportJSONModal() {
    this.setState({
      isOpenExportJSONModal: false
    });
  },

  onDatasourceSelected: function onDatasourceSelected(uri) {
    clooca.getModelInterface().setCurrentModel(uri);
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'core-header', style: { height: "32px", borderBottom: "solid 1px #333" } },
      React.createElement(
        'div',
        { style: { float: "left", "marginLeft": "12px" } },
        React.createElement(
          'div',
          null,
          React.createElement(
            Link,
            { to: '/projects' },
            '←Return'
          )
        )
      ),
      React.createElement(
        'div',
        { style: { float: "left", "marginLeft": "30px" } },
        React.createElement(
          Menu,
          null,
          React.createElement(
            MenuItem,
            { onSelect: this.onAddTabMenuSelected },
            'Add New Tab'
          ),
          React.createElement(
            MenuItem,
            { onSelect: this.onSaveMenuSelected },
            'Save Model'
          ),
          React.createElement(
            MenuItem,
            { onSelect: this.onImportMenuSelected },
            'Import Model'
          ),
          React.createElement(
            MenuItem,
            { onSelect: this.onExportMenuSelected },
            'Export Model'
          ),
          React.createElement(
            MenuItem,
            null,
            React.createElement(Resources, { onSelect: this.onDatasourceSelected })
          )
        )
      ),
      React.createElement('div', { style: { overflow: 'hidden', clear: 'both' } }),
      React.createElement(AddTabModal, { isOpen: this.state.isOpenAddTabModal, onOk: this.addTab, onClose: this.onCloseAddTabModal, pluginNames: this.props.pluginNames }),
      React.createElement(AddObjectModal, { isOpen: this.props.editorSettings.isOpenAddObjectModal, onClose: this.onCloseAddObjectModal, uri: this.props.editorSettings.uri }),
      React.createElement(AddContainmentModal, { isOpen: this.props.editorSettings.isOpenAddContainmentModal, onClose: this.onCloseAddContainmentModal, model: this.props.editorSettings.target, resourceSet: this.props.editorSettings.resourceSet }),
      React.createElement(ImportJSONModal, { isOpen: this.state.isOpenImportJSONModal, onClose: this.onCloseImportJSONModal }),
      React.createElement(ExportJSONModal, { isOpen: this.state.isOpenExportJSONModal, onClose: this.onCloseExportJSONModal })
    );
  }
});

module.exports = Header;
//# sourceMappingURL=header.js.map
