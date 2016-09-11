var Ecore = require('ecore');
var uuid = require('uuid');
var createServer = require('./cc');

function ModelInterface(server) {
	this.server = server;
}

ModelInterface.prototype.getInstance = function(id) {
	return this.server.query({id: id});
}

ModelInterface.prototype.getInstances = function(query) {
	return this.server.query(query);
}

ModelInterface.prototype.on = function(event, cb) {
	this.server.on(event, cb);
};

ModelInterface.prototype.loadMetaModel = function(uri, data) {
	return this.server.loadMetaModel(uri, data);
};

ModelInterface.prototype.loadModel = function(model) {
	return this.server.loadModel(model);
};

ModelInterface.prototype.getRawModel = function() {
	return this.server.model;
};

ModelInterface.prototype.getRawMetaModel = function() {
	return this.server.metamodel;
};

function ModelServer() {
	var self = this;
	this.resourceSet = Ecore.ResourceSet.create();
	this.server = createServer();
}

ModelServer.prototype.loadMetaModel = function(uri, data) {
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
		self.resourceSet.create({ uri: uri }).load(data, callback);
	})
}

ModelServer.prototype.loadModel = function(model) {
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


ModelServer.prototype.emit = function(event, args) {
	this.server.emit(event, args);
}

ModelServer.prototype.on = function(event, cb) {
	this.server.on(event, cb);
	this.fireUpdate();
}

ModelServer.prototype.query = function(query) {
	var self = this;
	return new Promise(function(resolve, reject) {
		if(query.id) {
			console.log(self.classes, query);
			resolve(self.classes[query.id]);
		}else{
			var targets = Object.keys(self.classes).map(function(_classKey) {
				return self.classes[_classKey];
			}).filter(function(_class) {
				if(query.type)
					return (_class.type == query.type);
				return false;
			});
			resolve(targets);
		}
	});
}

ModelServer.prototype.fireUpdate = function(model) {
	if(this.model) {
		this.server.emit('update', {
			model : this.model
		});
	}
}

ModelServer.prototype.getInterface = function() {
	return new ModelInterface(this);
}


module.exports = ModelServer;