module.exports = {
	transform: function() {
		var model = clooca.modelInterface.getRawModel().get('contents').first();
		var rootItem = {name:'root', children:this.transformPart(model)};
		return rootItem;
	},
	/*
	transformPart: function(model) {
		var containments = model.eClass.get('eAllContainments').map(function(asso) {
		  return asso.get('name');
		}).map(function(name) {
		  return model.get(name);
		});
		return containments.reduce(function(items, children) {
	      return items.concat(children.map(function(child) {
	        return child;
	      }));
	  	}, []).map((item) => {
	  		var children = this.transformPart(item);
	  		return {
	  			name: item.get('name'),
	  			children: children
	  		}
	  	})
	},*/
	transformPart: function(model) {
		var containments = model.eClass.get('eAllContainments').map(function(asso) {
		  return asso.get('name');
		}).map(function(name) {
		  return model.get(name);
		});
		return containments;
	}
}
