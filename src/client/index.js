var React = require('react');
var ReactDOM = require('react-dom');

var CoreComponent = require('./components/core');
var pluginLoader = require('./pluginLoader');
var Clooca = require('./clooca');
var registry = require('../common/core/registry');

var clooca = new Clooca();
window.clooca = clooca;

registry.addModule('clooca', clooca);

clooca.getCC().request('clooca', 'getSettings', {}).then((_settings) => {
	clooca.setSettings(_settings);
	return pluginLoader();
}).then((pluginNames) => {
	console.log(pluginNames);
	var mainEl = (<div><CoreComponent pluginNames={pluginNames}></CoreComponent></div>);
	ReactDOM.render(mainEl, document.getElementById('main'));
}).catch((err) => {
	console.error(err.stack);
});
