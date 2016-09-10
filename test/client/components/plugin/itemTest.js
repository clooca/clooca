var jsdom = require('jsdom').jsdom
global.document  = jsdom('<html><body></body></html>')
global.window    = document.defaultView
global.navigator = window.navigator
var React = require('react');
var ReactDom = require('react-dom');
var assert = require('assert');
var TestUtils = require('react-addons-test-utils');


describe('client/core/components/header', function() {

	var moduleName = '../../../../src/client/components/plugin/item';
	var PluginItemComponent = null;

	beforeEach(function() {
		PluginItemComponent = require(moduleName);
	});

	afterEach(function() {
		var name = require.resolve(moduleName);
		delete require.cache[name];
	});

    it('should child components have props', function () {
        var pluginItemComponent = <PluginItemComponent pluginName="dammyplugin" />
        var component = TestUtils.renderIntoDocument(pluginItemComponent);

        var itemDOMComponent = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'plugin-item'
        );
        
        assert(
            ReactDom.findDOMNode(itemDOMComponent).textContent === "dammyplugin"
        );
    });


});