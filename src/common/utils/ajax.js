const http = require("http"),
    https = require('https'),
    querystring = require("querystring"),
    URL = require('url');


/**
 * @params options req,res
 */
function request(method, url, params, headers, callback, _dataOptions) {
	var dataOptions = _dataOptions || {};
	var urlObject = URL.parse(url);
	var http_client = urlObject.protocol=="https:" ? https : http;
	if(dataOptions.req == 'json') {
		headers['Content-Type'] = 'application/json';
	}else{
		headers['Content-Type'] = 'application/x-www-form-urlencoded';
	}
	var options = {
		hostname: urlObject.hostname,
		port: urlObject.port,
		path: urlObject.path,
		method: method,
		headers : headers
	};

	if(method == 'GET' || method == 'DELETE') {
		var postItem = querystring.stringify(params);
		options.path += '?'+ postItem;
		http_client.get(options, process_response)
		.on('error', function (e) {
			callback(e);
		});
	}else{
		var req = http_client.request(options, process_response);
		req.setTimeout(5000);
		req.on('timeout', function() {
			if(callback) callback(new Error("timed out"), null);
			req.abort();
		});
		req.on('error', function(err) {
			if(callback) callback(err, null);
		});
		if(dataOptions.req == 'json') {
			var postItem = JSON.stringify(params);
		}else{
			var postItem = querystring.stringify(params);
		}
		var postItem = querystring.stringify(params);
		req.write(postItem);
		req.end();
	}

	function process_response(res) {
		if(callback) {
			var content = "";
			res.on('data', function(str) {
				content += str;
			});
			res.on('end', function() {
				responseType(dataOptions, content, callback);
			});
		}
	}
}

function requestBrowser(method, url, params, headers, callback, _options) {
	var options = _options || {};
	var urlObject = URL.parse(url);
	if(method == 'GET' || method == 'DELETE') {
		url += '?' + querystring.stringify(params);
	}
	var xhr = createCORSRequest(method , url);
	xhr.withCredentials = true;
	xhr.onload = function() {
		responseType(options, xhr.responseText, callback);
	}
	xhr.onerror = function() {
		callback(xhr.statusText || 'unknown error');
	}
	if(options.req == 'json') {
		xhr.setRequestHeader("Content-type", "application/json");
		var params_str = JSON.stringify(params);
	}else{
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		var params_str = querystring.stringify(params);
	}
	for(header_key in headers) {
		xhr.setRequestHeader(header_key, headers[header_key]);
	}
	if(method == 'GET' || method == 'DELETE') {
		xhr.send();
	}else{
		xhr.send(params_str);
	}
}


function post(url, params, options) {
	return new Promise((resolve, reject) => {
		this.request('POST', url, params, {}, function(err, data) {
			if(err) {
				return reject(err);
			}
			resolve(data);
		}, options);
	});
}

function get(url, qs, options) {
	return new Promise((resolve, reject) => {
		this.request('GET', url, qs, {}, function(err, data) {
			if(err) {
				return reject(err);
			}
			resolve(data);
		}, options);
	});
}

function put(url, params, options) {
	return new Promise((resolve, reject) => {
		this.request('PUT', url, params, {}, function(err, data) {
			if(err) {
				return reject(err);
			}
			resolve(data);
		}, options);
	});
}

function deleteMethod(url, qs, options) {
	return new Promise((resolve, reject) => {
		this.request('GET', url, qs, {}, function(err, data) {
			if(err) {
				return reject(err);
			}
			resolve(data);
		}, options);
	});
}

if ('browser' !== process.title) {
	module.exports = {
		request : request,
		post: post,
		get: get,
		put: put,
		delete: deleteMethod
	}
}else{
	module.exports = {
		request : requestBrowser,
		post: post,
		get: get,
		put: put,
		delete: deleteMethod
	}
}

function responseType(options, data, callback) {
	if(options.res == 'json') {
		var result = JSON.parse(data);
	}else{
		var result = data;
	}
	callback(null, result);
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}