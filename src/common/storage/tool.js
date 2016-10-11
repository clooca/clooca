module.exports = {
	saveTool: function(storage, toolId, projectData) {
		return storage.save('cltl', toolId, projectData);
	},
	loadTool: function(storage, toolId) {
		return storage.load('cltl', toolId);
	},
	deleteTool: function(storage, toolId) {
		return storage.delete('cltl', toolId);
	},
	listTools: function(storage) {
		return storage.list('cltl');
	}
}