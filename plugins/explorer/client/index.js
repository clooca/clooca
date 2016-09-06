var React = require('react');
var ReactDOM = require('react-dom');


window.clooca = window.parent.window.clooca;

var ExplorerComponent = require('./components/explorer');

var mainEl = (<div><ExplorerComponent></ExplorerComponent></div>);
ReactDOM.render(mainEl, document.getElementById('main'));



