
function generate(resources) {
    var model = resources.get('contents').first();
	return model.get('classes').map(function(_class) {
		var str = "class "+_class.get('name');
		if(_class.get('associations')) {
			str += "{" + _class.get('associations').map(function(association) {
				return 'var ' + association.get('name');
			}).join(";") + "}";
		}
		return str;
	})
}

module.exports = generate;