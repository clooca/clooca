var React = require('react');
var ReactDOM = require('react-dom');

var CoreComponent = require('./components/core');
var pluginLoader = require('./pluginLoader');
var Clooca = require('./clooca');
window.clooca = new Clooca();

pluginLoader(function(err, pluginNames) {
	var mainEl = (<div><CoreComponent pluginNames={pluginNames}></CoreComponent></div>);
	ReactDOM.render(mainEl, document.getElementById('main'));
});

