'use strict';

var registry = require('../../../common/core/registry');

module.exports = function () {
	return function (req, res) {
		var moduleName = req.params.moduleName;
		var methodName = req.params.methodName;
		var params = Object.assign({}, req.params, req.query, req.body);
		registry.getModule(moduleName).recvRequest(methodName, params).then(function (content) {
			res.json({
				err: null,
				content: content
			});
		}).catch(function (err) {
			res.json({
				err: err.message
			});
		});
	};
};
//# sourceMappingURL=rest.js.map
