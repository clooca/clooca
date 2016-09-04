var EventEmitter2 = require('eventemitter2').EventEmitter2;

module.exports = function() {
	var server = new EventEmitter2({
		wildcard: true,
		delimiter: '.',
		newListener: true,
		maxListeners: 20
	});
	return server;
}