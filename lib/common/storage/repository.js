'use strict';

module.exports = {
	saveModel: function saveModel(storage, uri, model) {
		return storage.save('clrep', uri, model);
	},
	loadModel: function loadModel(storage, uri) {
		return storage.load('clrep', uri);
	}
};
//# sourceMappingURL=repository.js.map
