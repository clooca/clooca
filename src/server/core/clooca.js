var ajax = require('../../common/utils/ajax');
var templateProject = require('./templateProject');

function clooca(settings) {
	this.settings = settings;
}

clooca.prototype.hasMethod = function(methodName) {
	return !!this[methodName];
}

clooca.prototype.recvRequest = function(methodName, params) {
	return this[methodName](params);
}

clooca.prototype.findEcoreModel = function(params) {
	return ajax.get(params.url, {}, {res:"json"});
}

clooca.prototype.templateProject = function(params) {
	return templateProject();
}

clooca.prototype.getSettings = function(params) {
	return new Promise((resolve, reject) => {
		resolve(this.settings);
	});
}

module.exports = clooca;