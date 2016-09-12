var ajax = require('../utils/ajax');
var registry = require('./registry');

function MQ() {

}

MQ.prototype.emit = function(first_argument) {
	// body...
};

MQ.prototype.on = function(first_argument) {
	// body...
};

if ('browser' !== process.title) {
	MQ.prototype.request = function(moduleName, methodName, params) {
		if(registry.getModule(moduleName).hasMethod(methodName)) {
			return registry.getModule(moduleName).recvRequest(methodName, params);
		}else{
			//TODO
		}
	};
}else{
	MQ.prototype.request = function(moduleName, methodName, params) {
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


module.exports = MQ;