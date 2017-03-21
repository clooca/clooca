var Ecore = require('ecore');
var uuid = require('uuid');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

export default class {
	constructor() {
		this.loadedModels = [];
		this.resourceSet = Ecore.ResourceSet.create();
		this.server = new EventEmitter2({
			wildcard: true,
			delimiter: '.',
			newListener: true,
			maxListeners: 20
		});
	}

	getRawModel() {
		if (!this.model) {
			this.model = this.resourceSet.create({ uri: 'model.json' });
		}
		return this.model;
	}

	getRawMetaModel() {
		return this.metamodel;
	}

	getResourceSet() {
		return this.resourceSet;
	}

	getLoadedList() {
		return this.loadedModels;
	}

	setCurrentModel(uri) {
		this.model = this.resourceSet.get('resources').filter(function (r) {
			return r.get('uri') == uri;
		})[0];
		this.emit('model.change', this.model);
	}

	getCurrentModel() {
		return this.model;
	}

	loadModel(uri, data, mode) {
		return new Promise((resolve, reject) => {
			const callback = (model, err) => {
				if (err) {
					reject(err);
					return;
				}
				if (mode == "w") {
					this.setCurrentModel(uri);
					this.loadedModels.push({ uri: uri });
				}
				resolve(model);
			};
			if (uri == 'http://www.eclipse.org/emf/2002/Ecore') {
				var resource = this.resourceSet.create({ uri: uri });
				resource.add(Ecore.EcorePackage);
				resolve(Ecore.EcorePackage);
			} else {
				if (data) {
					this.resourceSet.create({ uri: uri }).load(data, callback);
				} else {
					var model = this.resourceSet.create({ uri: uri });
					if (mode == "w") {
						this.setCurrentModel(uri);
						this.loadedModels.push({ uri: uri });
					}
					resolve(model);
				}
			}
		});

	}

	getModelJSON() {
		return {
			uri: this.model.get('uri'),
			data: this.model.to(Ecore.JSON)
		};
	}

	emit(event, args) {
		this.server.emit(event, args);
	}

	on(event, cb) {
		this.server.on(event, cb);
		this.fireUpdate();
	}

	query(query) {
		return new Promise(function (resolve, reject) {});
	}

	fireUpdate(model) {
		if (this.model) {
			this.server.emit('update', {
				model: this.model
			});
		}
	}


}