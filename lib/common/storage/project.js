'use strict';

module.exports = {
	saveProject: function saveProject(storage, projectId, projectData) {
		return storage.save('clprj', projectId, projectData);
	},
	loadProject: function loadProject(storage, projectId) {
		return storage.load('clprj', projectId);
	},
	deleteProject: function deleteProject(storage, projectId) {
		return storage.delete('clprj', projectId);
	},
	listProjects: function listProjects(storage) {
		return storage.list('clprj');
	}
};
//# sourceMappingURL=project.js.map
