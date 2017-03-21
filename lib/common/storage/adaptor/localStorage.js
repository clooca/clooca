'use strict';

module.exports = function (settings) {
	return {
		save: function save(bucket, key, content) {
			return new Promise(function (resolve, reject) {
				var result = window.localStorage.setItem(bucket + '-' + key, JSON.stringify(content));
				resolve(result);
			});
		},
		load: function load(bucket, key) {
			return new Promise(function (resolve, reject) {
				var result = window.localStorage.getItem(bucket + '-' + key);
				resolve(JSON.parse(result));
			});
		},
		delete: function _delete(bucket, key) {
			return new Promise(function (resolve, reject) {
				window.localStorage.removeItem(bucket + '-' + key);
				resolve();
			});
		},
		list: function list(bucket) {
			return new Promise(function (resolve, reject) {
				var results = Object.keys(window.localStorage).filter(function (key) {
					return key.indexOf(bucket) == 0;
				}).map(function (key) {
					var id = key.replace(bucket + '-', '');
					var result = window.localStorage.getItem(key);
					var result2 = JSON.parse(result);
					result2.id = id;
					return result2;
				});
				resolve(results);
			});
		}
	};
};
//# sourceMappingURL=localStorage.js.map
