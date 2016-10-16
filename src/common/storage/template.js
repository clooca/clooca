module.exports = {
	saveTemplate: function(storage, templateId, templateData) {
		return storage.save('cltp', templateId, templateData);
	},
	loadTemplate: function(storage, templateId) {
		return storage.load('cltp', templateId);
	},
	deleteTemplate: function(storage, templateId) {
		return storage.delete('cltp', templateId);
	},
	listTemplates: function(storage) {
		return storage.list('cltp');
	}
}