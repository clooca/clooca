/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function GraphiticalModelEditor() {
  var modelInterface = clooca.getModelInterface();
  var model = modelInterface.getRawModel();
  var resourceSet = modelInterface.getResourceSet();
  console.log(resourceSet.elements('Diagram'));
  model.on('change', function (f) {});

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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GraphiticalModelEditor = __webpack_require__(0);

window.clooca = window.parent.window.clooca;

var mainDom = document.getElementById('main');

var gme = new GraphiticalModelEditor(mainDom);

clooca.registerPlugin('gme', gme);

/***/ })
/******/ ]);