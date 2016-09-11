var fs = require('fs');
var path = require('path');
var registry = require('../../common/core/registry');

function load(pluginPath) {
	try{
		fs.mkdirSync(pluginPath);
	}catch(e) {
		if(e.code != "EEXIST") {
			console.error(e);
		}
	}
	var pluginNames = fs.readdirSync(pluginPath);
	return pluginNames.map((pluginName) => {
		var modulePath = path.join(pluginPath, pluginName);
		if(!this.alreadyLoaded[pluginName] && fs.lstatSync(modulePath).isDirectory()) {
			try{
				var pluginModule = require( modulePath );
				console.log(pluginName, 'loaded');
				this.alreadyLoaded[pluginName] = true;
			}catch(e) {
				console.error(e.message);
			}
			registry.addModule(pluginName, pluginModule);
			return {
				name: pluginName,
				path: modulePath
			}
		}else{
			return null;
		}
	}).filter(function(p) {
		return !!p;
	});
}

module.exports = {
	alreadyLoaded: {},
	load: load
}