(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function GraphiticalModelEditor() {
  var modelInterface = clooca.getModelInterface();
  var model = modelInterface.getRawModel();
  var resourceSet = modelInterface.getResourceSet();
  console.log(resourceSet.elements('Diagram'));
  model.on('change', function (f) {
    /*
     setState({
       model: f,
     });
     */
  });
  /*
  setState({
    model: model.get('contents').first(),
    resourceSet: resourceSet
  });
   this.on('select', function(object) {
    setState({
      model: object
    });
    return true;
  });
  */
  var nodes = diagram.get('nodes');
  var gnodes = nodes.map(function (node) {
    return node;
  }).reduce(function (acc, node) {
    var metaElement = node.get('metaElement');
    var containFeature = node.get('containFeature');
    console.log(acc, node, containFeature);
    return acc.concat(model.get(containFeature.get('name') || 'classes').map(function (_class) {
      return _class.get('name');
    }));
  }, []);
  var node = new clooca.diagrameditor.Node(this, metaNode, instanceData, base, { x: x, y: y, w: w, h: h });
}

GraphiticalModelEditor.prototype.hasMethod = function (methodName) {
  return !!this[methodName];
};

GraphiticalModelEditor.prototype.recvRequest = function (methodName, params) {
  return this[methodName](params);
};

GraphiticalModelEditor.prototype.selectObject = function (object) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    resolve(_this.cb(object));
  });
};

GraphiticalModelEditor.prototype.on = function (event, cb) {
  this.cb = cb;
};

module.exports = GraphiticalModelEditor;

},{}],2:[function(require,module,exports){
'use strict';

var GraphiticalModelEditor = require('./gme');

window.clooca = window.parent.window.clooca;

var mainDom = document.getElementById('main');

var gme = new GraphiticalModelEditor(mainDom);

clooca.registerPlugin('gme', gme);

},{"./gme":1}]},{},[2]);
