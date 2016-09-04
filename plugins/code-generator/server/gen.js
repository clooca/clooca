function generate() {
	var packages = modelInterface.getInstances({type: "classdiagram.package"});
	console.log(packages);
	return packages.map(function(p) {
		return "package "+p.properties.name + ";"
	});
}

module.exports = function() {
	var modelInterface = clooca.getModelInterface();
	var dom = document.createElement('div');
	dom.textContent = generate();
	return dom;
}