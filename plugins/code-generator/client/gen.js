var Promise = require('promise');

function generate() {
	var modelInterface = clooca.getModelInterface();
	return modelInterface.getInstances({type: "classdiagram.package"}).then(function(packages) {
		console.log(packages);
		var files = packages.map(function(p) {
			return "package "+p.properties.name + ";"
		});
		return new Promise(function(resolve, reject) {
			resolve(files);
		});
	})
}

module.exports = generate;