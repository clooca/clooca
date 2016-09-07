var Promise = require('promise');

function generate() {
    var model = clooca.modelInterface.getRawModel().get('contents').first();
    console.log(model);
	return model.get('classes').map(function(_class) {
		return "package "+_class.get('name') + ";"
	})
}

module.exports = generate;