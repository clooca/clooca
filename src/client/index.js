var React = require('react');
var ReactDOM = require('react-dom');

var CoreComponent = require('./components/core');
var pluginLoader = require('./pluginLoader');
var Clooca = require('./clooca');
var registry = require('../common/core/registry');

var clooca = new Clooca();
window.clooca = clooca;

registry.addModule('clooca', clooca);

let modelInterface = clooca.getModelInterface();
let cc = clooca.getCC();

clooca.getCC().request('clooca', 'getSettings', {}).then((_settings) => {
	clooca.setSettings(_settings);
	var loadTasks = clooca.settings.requiredModels.map((requiredModel)=>{
		return function() {
		    return cc.request('clooca', 'findEcoreModel', {url: requiredModel.location}).then((model)=>{
		    	return modelInterface.loadModel2( requiredModel.uri, model );
		    });
		}
	});
	return loadTasks.reduce(function (a, b) {
		return a.then(b);
	}, Promise.resolve(null));
}).then(function(content) {
  return clooca.getStorage().load('default');
}).then(function(modelJson) {
  if(modelJson)
    return modelInterface.loadModel(modelJson);
  else
    return new Promise((resolve, reject)=>{resolve()});
}).then(function(content) {
	return pluginLoader();
}).then((pluginNames) => {
	console.log(pluginNames);
	var mainEl = (<div><CoreComponent pluginNames={pluginNames}></CoreComponent></div>);
	ReactDOM.render(mainEl, document.getElementById('main'));
}).catch((err) => {
	console.error(err.stack);
});
