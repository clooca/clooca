var React = require('react');
var ReactDOM = require('react-dom');

var CoreComponent = require('./components/core');
var pluginLoader = require('./pluginLoader');
var Clooca = require('./clooca');
var registry = require('../common/core/registry');

var clooca = new Clooca();
window.clooca = clooca;

pluginLoader().then((pluginNames) => {
	console.log(pluginNames);
	var mainEl = (<div><CoreComponent pluginNames={pluginNames}></CoreComponent></div>);
	ReactDOM.render(mainEl, document.getElementById('main'));
}).catch((err) => {
	console.error(err);
});

registry.addModule('clooca', clooca);