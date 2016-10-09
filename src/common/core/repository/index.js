var repository = require('../../storage/repository');

module.exports = {
	save: function(clooca, uri, model) {
		return repository.saveModel(clooca.getStorage(), uri, model);
	},
	load: function(storage, uri) {
		return repository.loadModel(clooca.getStorage(), uri);
	},
	delete: function(clooca, uri) {
		return repository.deleteModel(clooca.getStorage(), uri);
	},
	list: function(clooca) {
		return repository.listModels(clooca.getStorage());
	}
}