var fs = require('fs');
var path = require('path');

function load(pluginPath) {
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
	alreadyLoaded: {},
	load: load
}