module.exports = function(settings) {
	return {
		save: function(bucket, key, content) {
			return new Promise((resolve, reject) => {
				var result = window.localStorage.setItem(bucket+'-'+key, JSON.stringify(content));
				resolve(result);
			});
		},
		load: function(bucket, key) {
			return new Promise((resolve, reject) => {
				var result = window.localStorage.getItem(bucket+'-'+key);
				resolve(JSON.parse(result));
			});
		},
		delete: function(bucket, key) {
			return new Promise((resolve, reject) => {
				window.localStorage.removeItem(bucket+'-'+key);
				resolve();
			});
		},
		list: function(bucket) {
			return new Promise((resolve, reject) => {
				var results = Object.keys(window.localStorage).filter((key)=>{
					return key.indexOf(bucket) == 0;
				}).map((key)=>{
					var id = key.replace(bucket+'-', '');
					var result = window.localStorage.getItem(key);
					var result2 = JSON.parse(result);
					result2.id = id;
					return result2;
				});
				resolve(results);
			});
		}
	}
}