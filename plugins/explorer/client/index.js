var React = require('react');
var ReactDOM = require('react-dom');


window.clooca = window.parent.window.clooca;




function ModelExplorer() {
	this.callbacks = [];
}

ModelExplorer.prototype.hasMethod = function(methodName) {
	return !!this[methodName];
};

ModelExplorer.prototype.recvRequest = function(methodName, params) {
	return this[methodName](params);
};

ModelExplorer.prototype.onSelect = function(callback) {
	this.callbacks.push(callback);
};

ModelExplorer.prototype.fireSelectEvent = function(elem) {
	this.callbacks.forEach(function(cb) {
		cb(elem);
	})
};



var modelExplorer = new ModelExplorer();

clooca.registerPlugin('explorer', modelExplorer);

var ExplorerComponent = require('./components/explorer');

var mainEl = (<div><ExplorerComponent modelExplorer={modelExplorer}></ExplorerComponent></div>);
ReactDOM.render(mainEl, document.getElementById('main'));
