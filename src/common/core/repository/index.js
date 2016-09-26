module.exports = {
	save: function(clooca, uri, model) {
		return clooca.getStorage().save('clrep', uri, model);
	},
	load: function(storage, uri) {
		return clooca.getStorage().load('clooca', uri);
	}
}