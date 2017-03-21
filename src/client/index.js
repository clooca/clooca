import Clooca from './clooca'
var React = require('react');
var ReactDOM = require('react-dom');

var IndexComponent = require('./components');
var pluginLoader = require('./pluginLoader');
var registry = require('../common/core/registry');

var project = require('../common/core/project');

var clooca = new Clooca();
window.clooca = clooca;

registry.addModule('clooca', clooca);

let modelInterface = clooca.getModelInterface();

clooca.getPlugin('clooca').request('getSettings', {}).then((_settings) => {
	clooca.setSettings(_settings);
	return project.init(clooca);
}).then(()=>{
	var mainEl = (<IndexComponent/>);
	ReactDOM.render(mainEl, document.getElementById('main'));
}).catch((err) => {
	console.error(err.stack);
});

/*
clooca.getCC().request('clooca', 'getSettings', {}).then((_settings) => {
	clooca.setSettings(_settings);
	return project.load(clooca, 'bookstore');
}).then(function(content) {
	return pluginLoader();
}).then((pluginNames) => {
	var mainEl = (<div><CoreComponent pluginNames={pluginNames}></CoreComponent></div>);
	ReactDOM.render(mainEl, document.getElementById('main'));
}).catch((err) => {
	console.error(err.stack);
});
*/