module.exports = {
	transform: function() {
		var model = clooca.modelInterface.getRawModel().get('contents').first();
		return this.transformPart(model);
	},
	transformPart: function(model) {
		var containments = model.eClass.get('eAllContainments').map(function(asso) {
		  return asso.get('name');
		}).map(function(name) {
		  return model.get(name);
		});
		return containments;
	}
}
