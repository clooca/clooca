module.exports = {
	saveModel: function(storage, uri, model) {
		return storage.save('clrep', uri, model);
	},
	loadModel: function(storage, uri) {
		return storage.load('clrep', uri);
	},
	deleteModel: function(storage, uri) {
		return storage.delete('clrep', uri);
	},
	listModels: function(storage) {
		return storage.list('clrep');
	}
}