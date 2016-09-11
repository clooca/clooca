var ModelServer = require('../common/core/model');
var CC = require('./core/cc');

function clooca() {
	this.registerdPlugins = {};

	var metamodelServer = new ModelServer();
	this.metamodelInterface = metamodelServer.getInterface();

	var server = new ModelServer(this.metamodelInterface);
	this.modelInterface = server.getInterface();

	this.cc = new CC();
}

clooca.prototype.getModelInterface = function() {
	return this.modelInterface;
}

clooca.prototype.getMetaModelInterface = function() {
	return this.metamodelInterface;
}

clooca.prototype.hasMethod = function(methodName) {
	return false;
};

clooca.prototype.recvRequest = function(methodName) {
};

clooca.prototype.getCC = function() {
	return this.cc;
};


clooca.prototype.getPluginComponent = function(pluginName) {
	return this.registerdPlugins[pluginName];
};

/**
 * @params: type is reactComponent or dom
 */
clooca.prototype.registerPlugin = function(pluginName, component, type) {
	this.registerdPlugins[pluginName] = component;
};

module.exports = clooca;