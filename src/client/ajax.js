var http = require("http"),
    https = require('https'),
    querystring = require("querystring");

function requestBrowser(method, path, params, headers, callback, errHandler, _type) {
	var params_str = querystring.stringify(params);
	var url = path;
	var type  = _type || "json";
	if(method == 'GET' && params_str) {
		url += '?' + params_str;
	}
	var xhr = createCORSRequest(method , url);
	xhr.withCredentials = true;
	xhr.onload = function() {
		if(type == "json") {
			callback(JSON.parse(xhr.responseText));
		}else{
			callback(xhr.responseText);
		}
	}
	xhr.onerror = function() {
		if(errHandler) errHandler(xhr.statusText || 'unknown error');
	}
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	for(header_key in headers) {
		xhr.setRequestHeader(header_key, headers[header_key]);
	}
	xhr.send(params_str);
}

module.exports = {
	request : requestBrowser
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
