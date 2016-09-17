var ModelInterface = require('../common/core/model');
var CC = require('../common/core/cc');
var registry = require('../common/core/registry');
var ModalAction = require('./actions/modal');
var LocalStorage = require('../common/storage/localStorage');

function clooca() {
	this.registerdPlugins = {};

	this.modelInterface = new ModelInterface();

	this.cc = new CC();
}

clooca.prototype.getModelInterface = function() {
	return this.modelInterface;
}

clooca.prototype.setSettings = function(settings) {
	this.settings = settings;
};

clooca.prototype.hasMethod = function(methodName) {
	return methodName == 'modal';
};

clooca.prototype.recvRequest = function(methodName, params) {
	return this[methodName](params);
}

clooca.prototype.modal = function(params) {
	ModalAction.open(params);
	return new Promise((resolve, reject)=>{
		resolve(true);
	});
}

clooca.prototype.getCC = function() {
	return this.cc;
};

clooca.prototype.getStorage = function() {
	return LocalStorage(this.settings);
};

clooca.prototype.getPluginComponent = function(pluginName) {
	return this.registerdPlugins[pluginName];
};

/**
 * @params: type is reactComponent or dom
 */
clooca.prototype.registerPlugin = function(pluginName, pluginModule) {
	registry.addModule(pluginName, pluginModule);
};

module.exports = clooca;