let prefix = 'cl-';

module.exports = function(settings) {
	return {
		save: function(modelId, content) {
			return new Promise((resolve, reject) => {
				var result = window.localStorage.setItem(prefix+modelId, JSON.stringify(content));
				resolve(result);
			});
		},
		load: function(modelId) {
			return new Promise((resolve, reject) => {
				var result = window.localStorage.getItem(prefix+modelId);
				resolve(JSON.parse(result));
			});
		}
	}
}