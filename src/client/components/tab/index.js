var React = require('react');
var Panel = require('../plugin/panel');
var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

let TabComponent = React.createClass({

  getInitialState: function () {
    return {
    	tabItems: [{
    		title: 'Diagram Editor'
    	},{
    		title: 'Code'
    	}],
    	tabPanels: [{
    		plugin: 'diagram-editor'
    	},{
    		plugin: 'code-generator'
    	}]
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

  addTab: function(options) {
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

  render: function () {
    var tabs = (!!this.props.editorSettings)?this.props.editorSettings.tabs:[];
  	var tabItemComps = tabs.map(function(tabItem) {
  		return (<Tab>{tabItem.title}</Tab>);
  	});
  	var tabPanelsComps = tabs.map(function(tabPanel) {
  		return (
        <TabPanel>
          <Panel plugin={tabPanel.plugin}></Panel>
        </TabPanel>
        );
  	});

    return (
    	<div>
      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={0}
      >
        <TabList>
        	{tabItemComps}
        </TabList>
        {tabPanelsComps}
      </Tabs>
	        </div>
    );
  }
});

module.exports = TabComponent;