var generator = require('./server/gen');

module.exports = function(clooca) {
	//server interface
	function samplePlugin() {
		this.client.on('action', function() {
			//code generation or deploy button
			var model = clooca.getModelInterface().getCurrentModel();
			console.log(model);
		});
	}
	clooca.registerPlugin(samplePlugin);
}