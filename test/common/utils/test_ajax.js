var jsdom = require('jsdom').jsdom
global.document  = jsdom('<html><body></body></html>')
global.window    = document.defaultView
global.navigator = window.navigator
var assert = require('assert');


describe('common/utils/ajax', function() {

	var moduleName = '../../../src/common/utils/ajax';
	var ajax = null;

	beforeEach(function() {
		ajax = require(moduleName);
	});

	afterEach(function() {
		var name = require.resolve(moduleName);
		delete require.cache[name];
	});

    it('should success to get', function () {
    	ajax.get('https://raw.githubusercontent.com/clooca/model-examples/master/examples/classdiagram/model.json', {}, {res:'json'}).then(function(data) {
    		assert(data.name == 'Book');
    	})
    });

});