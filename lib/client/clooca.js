'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('../common/core/model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PluginInterface = require('../common/core/pluginInterface');
var registry = require('../common/core/registry');
var ModalAction = require('./actions/modal');
var LocalStorage = require('../common/storage/adaptor/localStorage');

var _class = function () {
	function _class() {
		_classCallCheck(this, _class);

		this.registerdPlugins = {};
		this.settings = null;
	}

	_createClass(_class, [{
		key: 'createModelInterface',
		value: function createModelInterface() {
			this.modelInterface = new _model2.default();
			return this.modelInterface;
		}
	}, {
		key: 'getModelInterface',
		value: function getModelInterface() {
			return this.modelInterface;
		}
	}, {
		key: 'setSettings',
		value: function setSettings(settings) {
			this.settings = settings;
		}
	}, {
		key: 'hasMethod',
		value: function hasMethod(methodName) {
			return methodName == 'modal';
		}
	}, {
		key: 'recvRequest',
		value: function recvRequest(methodName, params) {
			return this[methodName](params);
		}
	}, {
		key: 'modal',
		value: function modal(params) {
			ModalAction.open(params);
			return new Promise(function (resolve, reject) {
				resolve(true);
			});
		}
	}, {
		key: 'getPlugin',
		value: function getPlugin(name) {
			return new PluginInterface(name);
		}
	}, {
		key: 'getStorage',
		value: function getStorage() {
			return LocalStorage(this.settings);
		}
	}, {
		key: 'getPluginComponent',
		value: function getPluginComponent(pluginName) {
			return this.registerdPlugins[pluginName];
		}
	}, {
		key: 'registerPlugin',
		value: function registerPlugin(pluginName, pluginModule) {
			registry.addModule(pluginName, pluginModule);
		}
	}]);

	return _class;
}();

exports.default = _class;
//# sourceMappingURL=clooca.js.map
