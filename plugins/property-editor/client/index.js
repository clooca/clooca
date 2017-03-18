var React = require('react');
var ReactDOM = require('react-dom');


window.clooca = window.parent.window.clooca;

var PropertyEditorComponent = require('./components');




function PropertyEditor() {

}

PropertyEditor.prototype.ready = function(methodName) {
	clooca.getPlugin('explorer').request('onSelect', (elem) => {
		this.selectObject(elem);
	});
};


PropertyEditor.prototype.hasMethod = function(methodName) {
	return !!this[methodName];
};

PropertyEditor.prototype.recvRequest = function(methodName, params) {
	return this[methodName](params);
};

PropertyEditor.prototype.selectObject = function(object) {
	return new Promise((resolve, reject) => {
		resolve(this.cb(object));
	});
};

PropertyEditor.prototype.on = function(event, cb) {
	this.cb = cb;
};


var propertyEditor = new PropertyEditor();

clooca.registerPlugin('property', propertyEditor);

var mainEl = (<PropertyEditorComponent propertyEditor={propertyEditor}></PropertyEditorComponent>);
ReactDOM.render(mainEl, document.getElementById('main'));
