var tool = require('../../storage/tool');

module.exports = {
	save: function(clooca, id, model) {
		return tool.saveModel(clooca.getStorage(), id, model);
	},
	load: function(storage, id) {
		return tool.loadModel(clooca.getStorage(), id);
	},
	delete: function(clooca, id) {
		return tool.deleteModel(clooca.getStorage(), id);
	},
	list: function(clooca) {
		return tool.listModels(clooca.getStorage());
	},
	makeTool: function() {
		//metamodel
		//code template
	}
}