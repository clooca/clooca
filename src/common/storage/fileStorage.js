var path = require('path');
var fs = require('fs');

module.exports = function(settings) {
	return {
		save: function(modelId, content) {
			return new Promise((resolve, reject) => {
				fs.writeFile( path.join(settings.userDir, modelId + '.json'), JSON.stringify(content), function(err, data) {
					if(err) return reject(err);
					resolve(data);
				});
			});
		},
		load: function(modelId) {
			return new Promise((resolve, reject) => {
				fs.readFile(path.join(settings.userDir, modelId + '.json'), function(err, data) {
					if(err) return reject(err);
					resolve( JSON.parse(data) );
				});
			});
		}
	}
}