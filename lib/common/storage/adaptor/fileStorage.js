'use strict';

var path = require('path');
var fs = require('fs');

module.exports = function (settings) {
	return {
		save: function save(bucket, key, content) {
			return new Promise(function (resolve, reject) {
				fs.writeFile(path.join(settings.userDir, bucket, key + '.json'), JSON.stringify(content), function (err, data) {
					if (err) return reject(err);
					resolve(data);
				});
			});
		},
		load: function load(bucket, key) {
			return new Promise(function (resolve, reject) {
				fs.readFile(path.join(settings.userDir, bucket, key + '.json'), function (err, data) {
					if (err) return reject(err);
					resolve(JSON.parse(data));
				});
			});
		}
	};
};
//# sourceMappingURL=fileStorage.js.map
