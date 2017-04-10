var React = require('react');
var ReactDOM = require('react-dom');


window.clooca = window.parent.window.clooca;

let renderDiagram = function(editorSetting) {
  var Component = require('./components/diagram');
  var mainEl = (<div><Component></Component></div>);
  ReactDOM.render(mainEl, document.getElementById('main'));
};

var superagent = require('superagent');
var url = '/editor-setting.json';
console.log(url);
superagent
  .get(url)
  .end((err, res) => {
    if (err) {
      console.warn(url, err);
      renderDiagram();
      return;
    }
    console.log(url, res);
    let resBody = res.body;
    console.log(resBody);
    if (!resBody) {
      console.log(window.editorSetting);
      renderDiagram();
      return;
    }
    window.editorSetting = resBody;
    renderDiagram();
  });