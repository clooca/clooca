var clooca = window.parent.window.clooca;

var mainDom = window.document.getElementById('main');

var modelInterface = clooca.getModelInterface();
modelInterface.on('update', function(e) {
  e.model.get('contents').first().on('add:classes', (_class) => {
  	var elem = document.createElement('div');
  	elem.textContent = _class.get('name');
  	mainDom.appendChild(elem);
  });
});

