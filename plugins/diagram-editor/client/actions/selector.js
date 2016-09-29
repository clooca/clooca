var actions = {
	select: function(id) {
		this.store.update({selected: id});
	},
	rubberband: function(id) {
		this.store.update({rubberband: id});
	},
	register: function(store) {
		this.store = store;
	}
}

module.exports = actions;
