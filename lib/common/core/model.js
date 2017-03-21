'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ecore = require('ecore');
var uuid = require('uuid');
var EventEmitter2 = require('eventemitter2').EventEmitter2;

var _class = function () {
	function _class() {
		_classCallCheck(this, _class);

		this.loadedModels = [];
		this.resourceSet = Ecore.ResourceSet.create();
		this.server = new EventEmitter2({
			wildcard: true,
			delimiter: '.',
			newListener: true,
			maxListeners: 20
		});
	}

	_createClass(_class, [{
		key: 'getRawModel',
		value: function getRawModel() {
			if (!this.model) {
				this.model = this.resourceSet.create({ uri: 'model.json' });
			}
			return this.model;
		}
	}, {
		key: 'getRawMetaModel',
		value: function getRawMetaModel() {
			return this.metamodel;
		}
	}, {
		key: 'getResourceSet',
		value: function getResourceSet() {
			return this.resourceSet;
		}
	}, {
		key: 'getLoadedList',
		value: function getLoadedList() {
			return this.loadedModels;
		}
	}, {
		key: 'setCurrentModel',
		value: function setCurrentModel(uri) {
			this.model = this.resourceSet.get('resources').filter(function (r) {
				return r.get('uri') == uri;
			})[0];
			this.emit('model.change', this.model);
		}
	}, {
		key: 'getCurrentModel',
		value: function getCurrentModel() {
			return this.model;
		}
	}, {
		key: 'loadModel',
		value: function loadModel(uri, data, mode) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				var callback = function callback(model, err) {
					if (err) {
						reject(err);
						return;
					}
					if (mode == "w") {
						_this.setCurrentModel(uri);
						_this.loadedModels.push({ uri: uri });
					}
					resolve(model);
				};
				if (uri == 'http://www.eclipse.org/emf/2002/Ecore') {
					var resource = _this.resourceSet.create({ uri: uri });
					resource.add(Ecore.EcorePackage);
					resolve(Ecore.EcorePackage);
				} else {
					if (data) {
						_this.resourceSet.create({ uri: uri }).load(data, callback);
					} else {
						var model = _this.resourceSet.create({ uri: uri });
						if (mode == "w") {
							_this.setCurrentModel(uri);
							_this.loadedModels.push({ uri: uri });
						}
						resolve(model);
					}
				}
			});
		}
	}, {
		key: 'getModelJSON',
		value: function getModelJSON() {
			return {
				uri: this.model.get('uri'),
				data: this.model.to(Ecore.JSON)
			};
		}
	}, {
		key: 'emit',
		value: function emit(event, args) {
			this.server.emit(event, args);
		}
	}, {
		key: 'on',
		value: function on(event, cb) {
			this.server.on(event, cb);
			this.fireUpdate();
		}
	}, {
		key: 'query',
		value: function query(_query) {
			return new Promise(function (resolve, reject) {});
		}
	}, {
		key: 'fireUpdate',
		value: function fireUpdate(model) {
			if (this.model) {
				this.server.emit('update', {
					model: this.model
				});
			}
		}
	}]);

	return _class;
}();

exports.default = _class;
//# sourceMappingURL=model.js.map
