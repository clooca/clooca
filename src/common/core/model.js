var Ecore = require('ecore');
var uuid = require('uuid');
var Promise = require('promise');
var createServer = require('./cc');

function ModelInterface(server) {
	this.server = server;
}

//contain=trueのassociationを実体化
//propertyを追加
ModelInterface.prototype.createInstance = function(parentId, associationId, args) {
	this.server.emit('model.createInstance', {
		parentId: parentId,
		associationId: associationId,
		args: args
	});
};

//contain=trueのassociationを削除
//propertyを削除
ModelInterface.prototype.deleteInstance = function(instanceId) {
	this.server.emit('model.deleteInstance', {
		instanceId: instanceId
	});
};

//contain=falseのassociationを実体化
ModelInterface.prototype.associate = function(instanceId, associationId, targetId) {
	this.server.emit('model.associate', {
		instanceId: instanceId,
		associationId: associationId,
		targetId: targetId
	});
};

//propertyを更新
ModelInterface.prototype.updateProperties = function(instanceId, params) {
	this.server.emit('model.updateProperties', {
		instanceId: instanceId,
		params: params
	});
};

ModelInterface.prototype.getInstance = function(id) {
	return this.server.query({id: id});
}

ModelInterface.prototype.getInstances = function(query) {
	return this.server.query(query);
}

ModelInterface.prototype.on = function(event, cb) {
	this.server.on(event, cb);
};

ModelInterface.prototype.loadMetaModel = function(model) {
	return this.server.loadMetaModel(model);
};

ModelInterface.prototype.loadModel = function(model) {
	return this.server.loadModel(model);
};

ModelInterface.prototype.getRawModel = function() {
	return this.server.model;
};


function ModelServer() {
	var self = this;
	this.resourceSet = Ecore.ResourceSet.create();

	this.server = createServer();
	this.classes = {};
	this.server.on('model.createInstance', function(info) {
		var instaceId = info.instaceId || uuid();
		var parentId = info.parentId;
		var associationId = info.associationId;
		var args = info.args;
		self.__class(associationId, instaceId, args).then(function(_class) {
			self.classes[instaceId] = _class;
			self.classes[parentId].relations[instaceId] = {
				id: instaceId,
				type: associationId
			}
			self.server.emit('model.createInstance.after', _class);
			self.fireUpdate();
		}).catch(function(err) {
			console.error(err.stack);
		})
	});
	this.server.on('model.relation', function(newEdge) {
		//create edge
		var node_id = newEdge.node_id;
		var id = newEdge.id || uuid();
		nodes[node_id].edges[id] = __edge(newEdge);
	});
	this.server.on('model.property', function(property) {
		var node_id = property.node_id;
		var id = property.id || uuid();
		nodes[node_id].property[id] = __property(property);
	});
}

ModelServer.prototype.loadMetaModel = function(metamodel) {
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
		self.resourceSet.create({ uri: 'classdiagram' }).load(metamodel, callback);
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
	this.server.emit('update', {
		model : this.model
	});
}

ModelServer.prototype.getInterface = function() {
	return new ModelInterface(this);
}

ModelServer.prototype.__class = function(associationId, id, args) {
	var self = this;
	console.log(associationId);
	return self.metamodel.getInstance(associationId).then(function(association) {
		return self.metamodel.getInstance(association.properties.target);
	}).then(function(target) {
		return new Promise(function(resolve, reject) {
			resolve( {
				id: id,
				type: target.id,
				properties: {
					name: "aaa"
				},
				relations: {

				}
			} );
		});
	})
}

function __edge(e) {
	return e;
}

function __property(p) {
	return p;
}

module.exports = ModelServer;