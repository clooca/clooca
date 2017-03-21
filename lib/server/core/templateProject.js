'use strict';

var fs = require('fs');
var path = require('path');

var templateProjectPath1 = path.resolve(__dirname, '../../../template/projects/bookstore.json');
var templateProjectPath2 = path.resolve(__dirname, '../../../template/projects/classdiagram.json');

module.exports = function () {
	return new Promise(function (resolve, reject) {
		fs.readFile(templateProjectPath1, function (err, data1) {
			if (err) return reject(err);
			fs.readFile(templateProjectPath2, function (err, data2) {
				if (err) return reject(err);
				resolve([{ key: 'bookstore', data: JSON.parse(data1) }, { key: 'classdiagram', data: JSON.parse(data2) }]);
			});
		});
	});
};
//# sourceMappingURL=templateProject.js.map
