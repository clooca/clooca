var TabAction = {
	open: function(params) {
		this.store.update( {
			isOpenAddContainmentModal:params.isOpenAddContainmentModal,
			uri: params.uri,
			isOpenAddObjectModal:params.isOpenAddObjectModal,
			target: params.model,
			resourceSet: params.resourceSet
		} );
	},
	close: function(params) {
		this.store.update( {
			isOpenAddContainmentModal:false,
			isOpenAddObjectModal:false
		} );
	},
	register: function(store) {
		this.store = store;
	}
}

module.exports = TabAction;