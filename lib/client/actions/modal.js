"use strict";

var TabAction = {
	open: function open(params) {
		this.store.update({
			isOpenAddContainmentModal: params.isOpenAddContainmentModal,
			uri: params.uri,
			isOpenAddObjectModal: params.isOpenAddObjectModal,
			target: params.model,
			resourceSet: params.resourceSet
		});
	},
	close: function close(params) {
		this.store.update({
			isOpenAddContainmentModal: false,
			isOpenAddObjectModal: false
		});
	},
	register: function register(store) {
		this.store = store;
	}
};

module.exports = TabAction;
//# sourceMappingURL=modal.js.map
