var jsdom = require('jsdom').jsdom
global.document  = jsdom('<html><body></body></html>')
global.window    = document.defaultView
global.navigator = window.navigator
var assert = require('assert');


describe('common/model', function() {

	var moduleName = '../../../src/common/core/model';
	var ModelInterface = null;

	beforeEach(function() {
		ModelInterface = require(moduleName).default;
	});

	afterEach(function() {
		var name = require.resolve(moduleName);
		delete require.cache[name];
	});

    it('should success to get model', function () {
        var modelInterface = new ModelInterface();
        modelInterface.loadModel( 'classdiagram', require('../../assets/classdiagram/classdiagram.json'), 'r' ).then(function(content) {
          return modelInterface.loadModel( 'bookstore', require('../../assets/classdiagram/bookstore.json'), 'w' );
        }).then(function(content) {
            var target = modelInterface.model.get('contents').first();
            assert(
                target.eClass.get('name') == "Class Diagram"
            );
        }).catch(function(err){
          console.error(err);
        });
    });

});