module.exports = {
	saveProject: function(storage, projectId, projectData) {
		return storage.save('clprj', projectId, projectData);
	},
	loadProject: function(storage, projectId) {
		return storage.load('clprj', projectId);
	},
	deleteProject: function(storage, projectId) {
		return storage.delete('clprj', projectId);
	},
	listProjects: function(storage) {
		return storage.list('clprj');
	}
}