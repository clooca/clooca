var Ecore = require('ecore');
var uuid = require('uuid');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

function ModelInterface(server) {
	this.resourceSet = Ecore.ResourceSet.create();
	this.server = new EventEmitter2({
		wildcard: true,
		delimiter: '.',
		newListener: true,
		maxListeners: 20
	});
}

ModelInterface.prototype.getRawModel = function() {
	return this.server.model;
};

ModelInterface.prototype.getRawMetaModel = function() {
	return this.server.metamodel;
};


ModelInterface.prototype.loadMetaModel = function(uri, data) {
	var self = this;
	return new Promise(function(resolve, reject) {
		var callback = function(model, err) {
		    if (err) {
		    	reject(err);
		        return;
		    }
		    self.metamodel = model;
			self.fireUpdate();
			resolve(model);
		};
		if(uri == 'ecore') {
			self.resourceSet.create({ uri: uri }).add(Ecore.EcorePackage);
			resolve(Ecore.EcorePackage);
		}else{
			self.resourceSet.create({ uri: uri }).load(data, callback);
		}
	})
}

ModelInterface.prototype.loadModel = function(model) {
	var self = this;
	return new Promise(function(resolve, reject) {
		var callback = function(model, err) {
		    if (err) {
		    	reject(err);
		        return;
		    }
		    self.model = model;
			self.fireUpdate();
			resolve(model);
		};
		self.resourceSet.create({ uri: 'model.json' }).load(model, callback);
	});
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