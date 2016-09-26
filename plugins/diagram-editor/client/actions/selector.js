var TabAction = {
	select: function(newTab) {
		this.store.update( {tabs:tabs.concat([newTab]) });
	},
	register: function(store) {
		this.store = store;
	}
}

module.exports = TabAction;


var actions = {
	select: function() {

	}
}

module.exports = {

}