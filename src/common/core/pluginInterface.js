var ajax = require('../utils/ajax');
var registry = require('./registry');

function PluginInterface(moduleName) {
	this.moduleName = moduleName;
}

PluginInterface.prototype.emit = function(first_argument) {
	// body...
};

PluginInterface.prototype.on = function(first_argument) {
	// body...
};

if ('browser' !== process.title) {
	PluginInterface.prototype.request = function(methodName, params) {
		var moduleName = this.moduleName;
		if(registry.getModule(moduleName).hasMethod(methodName)) {
			return registry.getModule(moduleName).recvRequest(methodName, params);
		}else{
			//TODO
		}
	};
}else{
	PluginInterface.prototype.request = function(methodName, params) {
		var moduleName = this.moduleName;
		if(registry.getModule(moduleName).hasMethod(methodName)) {
			return registry.getModule(moduleName).recvRequest(methodName, params);
		}else{
			return ajax.get(`/cc/${moduleName}/${methodName}`, params, {res:'json'}).then((data) => {
				return new Promise((resolve, reject) => {
					if(data.err) {
						reject(data.err);
						return;
					}
					resolve(data.content);
				});
			});
		}
	};	
}


module.exports = PluginInterface;