'use strict';

var projectLoader = require('../../storage/project');
var repository = require('../../storage/repository');

module.exports = {
	init: function init(clooca) {
		var _this = this;

		return this.list(clooca).then(function (projects) {
			if (projects.length == 0) {
				return clooca.getPlugin('clooca').request('templateProject', {});
			} else {
				return new Promise(function (resolve, reject) {
					resolve([]);
				});
			}
		}).then(function (templateprojects) {
			return Promise.all(templateprojects.map(function (p) {
				_this.save(clooca, p.key, p.data);
			}));
		}).then(function (projects) {
			return new Promise(function (resolve, reject) {
				setTimeout(resolve, 1000);
			});
		});
	},
	load: function load(clooca, projectId) {
		var storage = clooca.getStorage();
		var modelInterface = clooca.createModelInterface();
		return projectLoader.loadProject(storage, projectId).then(function (projectData) {
			var required = projectData.required || [];
			var loadRequiredTasks = required.map(function (requiredModel) {
				return function () {
					return repository.loadModel(storage, requiredModel.uri).then(function (modelJson) {
						if (modelJson || requiredModel.uri == 'http://www.eclipse.org/emf/2002/Ecore') {
							return modelInterface.loadModel(requiredModel.uri, modelJson, 'r');
						} else {
							return clooca.getPlugin('clooca').request('findEcoreModel', { url: requiredModel.uri }).then(function (model) {
								return modelInterface.loadModel(requiredModel.uri, model, 'r');
							});
						}
					});
				};
			});
			var models = projectData.models || [];
			var loadModelTasks = models.map(function (requiredModel) {
				return function () {
					return repository.loadModel(storage, requiredModel.uri).then(function (modelJson) {
						if (!modelJson && requiredModel.import) {
							return clooca.getPlugin('clooca').request('findEcoreModel', { url: requiredModel.uri }).then(function (model) {
								return modelInterface.loadModel(requiredModel.uri, model, 'w');
							});
						} else {
							return modelInterface.loadModel(requiredModel.uri, modelJson, 'w');
						}
					});
				};
			});
			var loadTasks = loadRequiredTasks.concat(loadModelTasks);
			return loadTasks.reduce(function (a, b) {
				return a.then(b);
			}, Promise.resolve(null));
		});
	},
	save: function save(clooca, name, data) {
		return projectLoader.saveProject(clooca.getStorage(), name, data);
	},
	delete: function _delete(clooca, name) {
		return projectLoader.deleteProject(clooca.getStorage(), name);
	},
	list: function list(clooca) {
		return projectLoader.listProjects(clooca.getStorage());
	}
};
//# sourceMappingURL=index.js.map
