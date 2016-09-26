module.exports = {
	saveModel: function(storage, uri, model) {
		return storage.save('clrep', uri, model);
	},
	loadModel: function(storage, uri) {
		return storage.load('clrep', uri);
	}
}