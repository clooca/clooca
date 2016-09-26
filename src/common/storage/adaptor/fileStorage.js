var path = require('path');
var fs = require('fs');

module.exports = function(settings) {
	return {
		save: function(bucket, key, content) {
			return new Promise((resolve, reject) => {
				fs.writeFile( path.join(settings.userDir, bucket, key + '.json'), JSON.stringify(content), function(err, data) {
					if(err) return reject(err);
					resolve(data);
				});
			});
		},
		load: function(bucket, key) {
			return new Promise((resolve, reject) => {
				fs.readFile(path.join(settings.userDir, bucket, key + '.json'), function(err, data) {
					if(err) return reject(err);
					resolve( JSON.parse(data) );
				});
			});
		}
	}
}