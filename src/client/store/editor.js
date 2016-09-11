var defaultData = {
	tabs: [{
		title: 'Diagram Editor',
		plugin: 'diagram-editor'
	},{
		title: 'Code',
		plugin: 'code-generator'
	}]
}

module.exports = {
	storedData: defaultData,
	observer: [],
	get: function() {
		return this.storedData;
	},
	update: function(params) {
		this.storedData = Object.assign(this.storedData, params);
		this.fire(this.storedData);
	},
	fire: function(e) {
		this.observer.forEach((obs) => {
			obs(e);
		})
	} ,
	observe: function(cb) {
		this.observer.push(cb);
		this.fire(this.storedData);
	}
}
