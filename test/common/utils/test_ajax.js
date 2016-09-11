var jsdom = require('jsdom').jsdom
global.document  = jsdom('<html><body></body></html>')
global.window    = document.defaultView
global.navigator = window.navigator
var assert = require('assert');


describe('common/utils/ajax', function() {

	var moduleName = '../../../src/common/utils/ajax';
	var ajax = null;

	beforeEach(function() {
		ModelServer = require(moduleName);
	});

	afterEach(function() {
		var name = require.resolve(moduleName);
		delete require.cache[name];
	});

    it('should success to get', function () {
    	ajax.get().then(function(data) {
    		assert(data.indexOf('') >= 0)
    	})
    });

});