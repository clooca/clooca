function addModule(moduleName, moduleObject) {
	this._modules[moduleName] = moduleObject;
}

function getModule(moduleName) {
	return this._modules[moduleName];
}

module.exports = {
	_modules: {},
	addModule: addModule,
	getModule: getModule
}