'use strict';

var React = require('react');
var Panel = require('../plugin/panel');
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

var TabComponent = React.createClass({
  displayName: 'TabComponent',


  getInitialState: function getInitialState() {
    return {
      tabItems: [{
        title: 'Diagram Editor'
      }, {
        title: 'Code'
      }],
      tabPanels: [{
        plugin: 'diagram-editor'
      }, {
        plugin: 'code-generator'
      }]
    };
  },

  componentWillMount: function componentWillMount() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  addTab: function addTab(options) {
    var tabItems = this.state.tabItems.slice();
    var tabPanels = this.state.tabPanels.slice();
    tabItems.push(options);
    tabPanels.push(options);
    this.setState({
      tabItems: tabItems
    });
    this.setState({
      tabPanels: tabPanels
    });
  },

  render: function render() {
    var tabs = !!this.props.editorSettings ? this.props.editorSettings.tabs : [];
    var tabItemComps = tabs.map(function (tabItem) {
      return React.createElement(
        Tab,
        { key: 'tab-' + tabItem.title },
        tabItem.title
      );
    });
    var tabPanelsComps = tabs.map(function (tabPanel) {
      return React.createElement(
        TabPanel,
        { key: 'tabpanel-' + tabPanel.title },
        React.createElement(Panel, { plugin: tabPanel.plugin })
      );
    });

    return React.createElement(
      'div',
      null,
      React.createElement(
        Tabs,
        {
          onSelect: this.handleSelect,
          selectedIndex: 0
        },
        React.createElement(
          TabList,
          null,
          tabItemComps
        ),
        tabPanelsComps
      )
    );
  }
});

module.exports = TabComponent;
//# sourceMappingURL=index.js.map
