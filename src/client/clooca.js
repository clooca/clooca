import ModelInterface from '../common/core/model'
var PluginInterface = require('../common/core/pluginInterface');
var registry = require('../common/core/registry');
var ModalAction = require('./actions/modal');
var LocalStorage = require('../common/storage/adaptor/localStorage');
let EventEmitter = require("events").EventEmitter;

export default class extends EventEmitter {
	constructor() {
		super();
		this.registerdPlugins = {};
		this.settings = null;
	}

	createModelInterface() {
		this.modelInterface = new ModelInterface();
		return this.modelInterface;
	}

	getModelInterface() {
		return this.modelInterface;
	}

	setSettings(settings) {
		this.settings = settings;
	}

	hasMethod(methodName) {
		return methodName == 'modal';
	}

	recvRequest(methodName, params) {
		return this[methodName](params);
	}

	modal(params) {
		ModalAction.open(params);
		return new Promise((resolve, reject)=>{
			resolve(true);
		});
	}

	getPlugin(name) {
		return new PluginInterface(name);
	}

	isPluginLoaded(name) {
		return !!registry.getModule(name);
	}

	getStorage() {
		return LocalStorage(this.settings);
	}

	getPluginComponent(pluginName) {
		return this.registerdPlugins[pluginName];
	}

	registerPlugin(pluginName, pluginModule) {
		registry.addModule(pluginName, pluginModule);
		this.emit('pluginRegister', {pluginName: pluginName});
	}

}