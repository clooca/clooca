var ajax = require('../../common/utils/ajax');
var registry = require('../../common/core/registry');

function MQ() {

}

MQ.prototype.emit = function(first_argument) {
	// body...
};

MQ.prototype.on = function(first_argument) {
	// body...
};

MQ.prototype.request = function(moduleName, methodName, params) {
	if(registry.getModule(moduleName).hasMethod(methodName)) {
		return registry.getModule(moduleName).recvRequest(methodName, params);
	}else{
		//TODO: send request to client
	}
};

module.exports = MQ;