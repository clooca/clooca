"use strict";

var TabAction = {
	add: function add(newTab) {
		var tabs = this.store.get().tabs;
		this.store.update({ tabs: tabs.concat([newTab]) });
	},
	register: function register(store) {
		this.store = store;
	}
};

module.exports = TabAction;
//# sourceMappingURL=tab.js.map
