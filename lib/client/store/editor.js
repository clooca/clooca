'use strict';

var defaultData = {
	isOpenAddObjectModal: false,
	isOpenAddContainmentModal: false,
	tabs: [{
		title: 'Property',
		plugin: 'property-editor'
	}, {
		title: 'Diagram Editor',
		plugin: 'diagram-editor'
	}, {
		title: 'Code',
		plugin: 'code-generator'
	}]
};

module.exports = {
	storedData: defaultData,
	observer: [],
	get: function get() {
		return this.storedData;
	},
	update: function update(params) {
		this.storedData = Object.assign(this.storedData, params);
		this.fire(this.storedData);
	},
	fire: function fire(e) {
		this.observer.forEach(function (obs) {
			obs(e);
		});
	},
	observe: function observe(cb) {
		this.observer.push(cb);
		this.fire(this.storedData);
	}
};
//# sourceMappingURL=editor.js.map
