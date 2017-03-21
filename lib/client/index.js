'use strict';

var _clooca = require('./clooca');

var _clooca2 = _interopRequireDefault(_clooca);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');
var ReactDOM = require('react-dom');

var IndexComponent = require('./components');
var pluginLoader = require('./pluginLoader');
var registry = require('../common/core/registry');

var project = require('../common/core/project');

var clooca = new _clooca2.default();
window.clooca = clooca;

registry.addModule('clooca', clooca);

var modelInterface = clooca.getModelInterface();

clooca.getPlugin('clooca').request('getSettings', {}).then(function (_settings) {
	clooca.setSettings(_settings);
	return project.init(clooca);
}).then(function () {
	var mainEl = React.createElement(IndexComponent, null);
	ReactDOM.render(mainEl, document.getElementById('main'));
}).catch(function (err) {
	console.error(err.stack);
});
//# sourceMappingURL=index.js.map
