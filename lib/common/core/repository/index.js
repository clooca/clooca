'use strict';

module.exports = {
	save: function save(clooca, uri, model) {
		return clooca.getStorage().save('clrep', uri, model);
	},
	load: function load(storage, uri) {
		return clooca.getStorage().load('clooca', uri);
	}
};
//# sourceMappingURL=index.js.map
