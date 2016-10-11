var GraphiticalModelEditor = require('./gme2');

window.clooca = window.parent.window.clooca;

var mainDom = document.getElementById('main');


var gme = new GraphiticalModelEditor(mainDom);

clooca.registerPlugin('gme', gme);