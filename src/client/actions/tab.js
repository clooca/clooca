var TabAction = {
	add: function(newTab) {
		var tabs = this.store.get().tabs;
		this.store.update( {tabs:tabs.concat([newTab]) });
	},
	register: function(store) {
		this.store = store;
	}
}

module.exports = TabAction;