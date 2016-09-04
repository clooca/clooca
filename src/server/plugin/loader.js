var fs = require('fs');
var path = require('path');

function load(pluginPath) {
	var pluginNames = fs.readdirSync(pluginPath);
	return pluginNames.map(function(pluginName) {
		var modulePath = path.join(pluginPath, pluginName);
		if(fs.lstatSync(modulePath).isDirectory()) {
			var pluginModule = require( modulePath );
			console.log(pluginName, 'loaded');
			//pluginModule(clooca);
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
	load: load
}