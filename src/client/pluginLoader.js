var ajax = require('./ajax');

function loadScript(src, callback) {
    var done = false;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = src;
    head.appendChild(script);
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
        if ( !done && (!this.readyState ||
                this.readyState === "loaded" || this.readyState === "complete") ) {
            done = true;
            callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };
}

module.exports = function(cb) {
	ajax.request("GET", '/plugins', {}, {}, function(pluginNames) {
        /*
		pluginNames.forEach(function(name) {
			loadScript('/plugins/' + name, function() {
				console.log('loaded', name);
			});
		});
        */
		cb(null, pluginNames);
	}, function() {

	}, "json");

}