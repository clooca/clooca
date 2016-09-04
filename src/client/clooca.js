var ModelServer = require('../common/core/model');


function clooca() {
	this.registerdPlugins = {};

	var metamodelServer = new ModelServer();
	this.metamodelInterface = metamodelServer.getInterface();

	var server = new ModelServer(this.metamodelInterface);
	this.modelInterface = server.getInterface();
}

clooca.prototype.getModelInterface = function() {
	return this.modelInterface;
}

clooca.prototype.getMetaModelInterface = function() {
	return this.metamodelInterface;
}

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