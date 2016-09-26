var Ecore = require('ecore');
var uuid = require('uuid');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

function ModelInterface(server) {
	this.loadedModels = [];
	this.resourceSet = Ecore.ResourceSet.create();
	this.server = new EventEmitter2({
		wildcard: true,
		delimiter: '.',
		newListener: true,
		maxListeners: 20
	});
}

ModelInterface.prototype.getRawModel = function() {
	if(!this.model) {
		this.model = this.resourceSet.create({ uri: 'model.json' })
	}
	return this.model;
};

ModelInterface.prototype.getRawMetaModel = function() {
	return this.metamodel;
};

ModelInterface.prototype.getResourceSet = function() {
	return this.resourceSet;
};

ModelInterface.prototype.getLoadedList = function() {
	return this.loadedModels;
};

ModelInterface.prototype.setCurrentModel = function(uri) {
	this.model = this.resourceSet.get('resources').filter((r)=>{
		return r.get('uri') == uri;
	})[0];
	this.emit('model.change', this.model);
};

ModelInterface.prototype.getCurrentModel = function() {
	return this.model;
};

ModelInterface.prototype.loadModel = function(uri, data, mode) {
	var self = this;
	return new Promise(function(resolve, reject) {
		var callback = function(model, err) {
		    if (err) {
		    	reject(err);
		        return;
		    }
		    if(mode == "w") {
		    	self.setCurrentModel(uri);
		    	self.loadedModels.push({uri:uri});
		    }
			resolve(model);
		};
		if(uri == 'http://www.eclipse.org/emf/2002/Ecore') {
			var resource = self.resourceSet.create({ uri: uri });
			resource.add(Ecore.EcorePackage);
			resolve(Ecore.EcorePackage);
		}else{
			if(data) {
				self.resourceSet.create({ uri: uri }).load(data, callback);
			}else{
				var model = self.resourceSet.create({ uri: uri });
			    if(mode == "w") {
			    	self.setCurrentModel(uri);
			    	self.loadedModels.push({uri:uri});
			    }
				resolve(model);
			}
		}
	});
}

ModelInterface.prototype.getModelJSON = function() {
	return {
		uri: this.model.get('uri'),
		data: this.model.to(Ecore.JSON)
	}
}

ModelInterface.prototype.emit = function(event, args) {
	this.server.emit(event, args);
}

ModelInterface.prototype.on = function(event, cb) {
	this.server.on(event, cb);
	this.fireUpdate();
}

ModelInterface.prototype.query = function(query) {
	//TODO: query to model
	return new Promise(function(resolve, reject) {
	});
}

ModelInterface.prototype.fireUpdate = function(model) {
	if(this.model) {
		this.server.emit('update', {
			model : this.model
		});
	}
}

module.exports = ModelInterface;