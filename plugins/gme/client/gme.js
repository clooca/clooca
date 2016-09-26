function GraphiticalModelEditor() {
    var modelInterface = clooca.getModelInterface();
    var model = modelInterface.getRawModel();
    var resourceSet = modelInterface.getResourceSet();
    console.log(resourceSet.elements('Diagram'));
    model.on('change', function(f) {
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
    let nodes = diagram.get('nodes');
    let gnodes = nodes.map( (node)=>{return node;} ).reduce((acc, node) => {
      let metaElement = node.get('metaElement');
      let containFeature = node.get('containFeature');
      console.log(acc, node, containFeature);
      return acc.concat(model.get(containFeature.get('name') || 'classes').map(function(_class) {
        return _class.get('name')
      }));
    }, []);
    			var node = new clooca.diagrameditor.Node(this,
					metaNode,
					instanceData,
					base,
					{x:x, y:y, w:w, h:h});


}

GraphiticalModelEditor.prototype.hasMethod = function(methodName) {
	return !!this[methodName];
};

GraphiticalModelEditor.prototype.recvRequest = function(methodName, params) {
	return this[methodName](params);
};

GraphiticalModelEditor.prototype.selectObject = function(object) {
	return new Promise((resolve, reject) => {
		resolve(this.cb(object));
	});
};

GraphiticalModelEditor.prototype.on = function(event, cb) {
	this.cb = cb;
};

module.exports = GraphiticalModelEditor;