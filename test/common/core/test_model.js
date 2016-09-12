var jsdom = require('jsdom').jsdom
global.document  = jsdom('<html><body></body></html>')
global.window    = document.defaultView
global.navigator = window.navigator
var assert = require('assert');


describe('common/model', function() {

	var moduleName = '../../../src/common/core/model';
	var ModelInterface = null;

	beforeEach(function() {
		ModelInterface = require(moduleName);
	});

	afterEach(function() {
		var name = require.resolve(moduleName);
		delete require.cache[name];
	});

    it('should success to get model', function () {
        var modelInterface = new ModelInterface();
        modelInterface.loadMetaModel( 'classdiagram', require('../../assets/classdiagram/classdiagram.json') ).then(function(content) {
          return modelInterface.loadModel( require('../../assets/classdiagram/bookstore.json') );
        }).then(function(content) {
            var target = modelInterface.getRawModel().get('contents').first();
            assert(
                target.eClass.get('name') == "Class Diagram"
            );
        }).catch(function(err){
          console.error(err);
        });
    });

});