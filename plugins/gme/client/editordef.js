/**
 * client/editor/diagrameditor/editordef.js
 * Copyright (C) 2013 Technical Rockstars Co.,Ltd. All Rights Reserved.
 * @author Shuhei Hiya
 */
(function(){
	
	/**
	 * @param editordef_info エディタ定義情報が格納されている
	 * @param context メタモデル情報が格納されている
	 */
	function EditorDef(editordef_info) {
		this.diagrams = {};
		this.graphics = {};
		this.connectiongraphics = {};
		for(var key in editordef_info.diagrams) {
			var d = editordef_info.diagrams[key];
			this.diagrams[key] = new EditorDef.Diagram(d);
		}
		for(var key in editordef_info.graphics) {
			var g = editordef_info.graphics[key];
			this.graphics[key] = new EditorDef.Graphic(g);
		}
		for(var key in editordef_info.connectiongraphics) {
			var cg = editordef_info.connectiongraphics[key];
			this.connectiongraphics[key] = new EditorDef.ConnectionGraphic(cg);
		}
	}
	
	/**
	 * @param klass
	 * klassと関連づけられている、エディタを返す関数
	 */
	EditorDef.prototype.getEditor = function(klass) {
		return this.getDiagram(klass);
	}
	
	EditorDef.prototype.getPluginName = function() {
		return "diagrameditor";
	}
	
	EditorDef.prototype.getDiagram = function(klass) {
		for(var i in this.diagrams) {
			if(this.diagrams[i].metaElement == klass.id) {
				return this.diagrams[i];
			}
		}
		return null;
	}
	
	EditorDef.Diagram = function(dinfo) {
		this.name = dinfo.name;
		this.metaElement = dinfo.metaElement;
		this.nodeinfo = dinfo.nodeinfo;
		this.nodes = {};
		this.connections = {};
		this.toolpallet = [];
		for(var key in dinfo.nodes) {
			this.nodes[key] = new EditorDef.Node(dinfo.nodes[key])
		}
		for(var key in dinfo.connections) {
			this.connections[key] = new EditorDef.Connection(dinfo.connections[key])
		}
		for(var key in dinfo.tools) {
			this.toolpallet.push(dinfo.tools[key]);
		}
	}
	
	EditorDef.Diagram.prototype.getDiagramElementByClass = function(klass) {
		var node = this.getNodeByClass(klass);
		if(node) {
			return node;
		}else{
			var con = this.getConnectionByClass(klass);
			if(con) {
				return con;
			}
		}
		return null;
	}
	
	EditorDef.Diagram.prototype.getNodeById = function(id) {
		for(var i in this.nodes) {
			if(this.nodes[i].id == id) {
				return this.nodes[i];
			}
			for(var j in this.nodes[i].children) {
				if(this.nodes[i].children[j].id == id) {
					return this.nodes[i].children[j];
				}
			}
		}
		return null;
	}
	
	EditorDef.Diagram.prototype.getNodeByClass = function(klass) {
		for(var i in this.nodes) {
			if(this.nodes[i].metaElement == klass.id) {
				return this.nodes[i];
			}
		}
		return null;
	}
	
	function getConnection(id) {
		for(var i in this.connections) {
			console.log(this.connections[i].id, id);
			if(this.connections[i].id == id) {
				return this.connections[i];
			}
		}
		return null;
	}
	EditorDef.Diagram.prototype.getConnection = getConnection;
	EditorDef.Diagram.prototype.getConnectionById = getConnection;
	EditorDef.Diagram.prototype.getConnectionByClass = function(klass) {
		for(var i in this.connections) {
			if(this.connections[i].metaElement == klass.id) {
				return this.connections[i];
			}
		}
		return null;
	}
	
	
	EditorDef.Node = function(nodeinfo) {
		this.id = nodeinfo.id;
		this.name = nodeinfo.name;
		this.metaElement = nodeinfo.metaElement;
		this.containFeature = nodeinfo.containFeature;
		this.graphic = nodeinfo.graphic;
		this.children = {};
		for(var key in nodeinfo.children) {
			this.children[key] = new EditorDef.Node(nodeinfo.children[key]);
		}
	}
	
	EditorDef.Connection = function(coninfo) {
		this.id = coninfo.id;
		this.name = coninfo.name;
		this.metaElement = coninfo.metaElement;
		this.graphic = coninfo.graphic;
		this.containFeature = coninfo.containFeature;
		this.sourceFeature = coninfo.sourceFeature;
		this.targetFeature = coninfo.targetFeature;
	}
	
	EditorDef.prototype.getGraphic = function(id) {
		for(var i in this.graphics) {
			if(this.graphics[i].id == id) {
				return this.graphics[i];
			}
		}
		return null;
	}
	
	EditorDef.prototype.getConnectionGraphic = function(id) {
		for(var i in this.connectiongraphics) {
			if(this.connectiongraphics[i].id == id) {
				return this.connectiongraphics[i];
			}
		}
		return null;
	}
	
	EditorDef.Graphic = function(g) {
		this.id = g.id;
		this.name = g.name;
		this.shape = g.shape;
		this.color = g.color || "#00ff00";
		this.defaultwidth = g.defaultwidth || 80;
		this.defaultheight = g.defaultheight || 40;
		this.style = g.style || "";
		this.styleObject = {
				resizable : 'xy'
		};
		if(this.style && this.style != "") {
			var styleCompiler = new clooca.StyleCompiler(this.style);
			if(styleCompiler.getItem("resizable")) styleObject.resizable = styleCompiler.getItem("resizable");
		}
		this.labels = {};
		this.shapes = {};
		this.panels = {};
		for(var key in g.labels) {
			this.labels[g.labels[key].name] = createLabel(g.labels[key]);
		}
		for(var key in g.shapes) {
			this.shapes[key] = g.shapes[key];
		}
		for(var key in g.panels) {
			this.panels[key] = createPanel(g.panels[key]);
		}
	}
	
	function createPanel(p) {
		var panel = {panels:{},labels:{},style:p.style};
		//start of スタイルオブジェクトの初期化
		var styleObject = {
				border : "solid",
				layout : "vbox",
				top : 0,
				left : 0
		};
		if(p.style && p.style != "") {
			var styleCompiler = new clooca.StyleCompiler(p.style);
			if(styleCompiler.getItem("border")) styleObject.border = styleCompiler.getItem("border");
			if(styleCompiler.getItem("layout")) styleObject.layout = styleCompiler.getItem("layout");
			if(styleCompiler.getItem("top")) styleObject.top = Number(styleCompiler.getItem("top"));
			if(styleCompiler.getItem("left")) styleObject.left = Number(styleCompiler.getItem("left"));
		}
		panel.styleObject = styleObject;
		//end of スタイルオブジェクトの初期化
		for(var key in p.panels) {
			panel.panels[key] = createPanel(p.panels[key]);
		}
		for(var key in p.labels) {
			panel.labels[p.labels[key].name] = createLabel(p.labels[key]);
		}
		return panel;
	}
	function createLabel(l) {
		var styleObject = {
				border : "solid",
				layout : "vbox",
				top : 0,
				left : 0,
				u : 0,
				v : 0,
				marker : false,
				align : 'left'
		};
		if(l.style && l.style != "") {
			var styleCompiler = new clooca.StyleCompiler(l.style);
			if(styleCompiler.getItem("border")) styleObject.border = styleCompiler.getItem("border");
			if(styleCompiler.getItem("layout")) styleObject.layout = styleCompiler.getItem("layout");
			if(styleCompiler.getItem("order")) styleObject.order = Number(styleCompiler.getItem("order"));
			if(styleCompiler.getItem("marker")) styleObject.marker = (styleCompiler.getItem("marker")=="true");
			if(styleCompiler.getItem("align")) styleObject.align = styleCompiler.getItem("align");
			if(styleCompiler.getItem("left")) styleObject.left = Number(styleCompiler.getItem("left"));
			if(styleCompiler.getItem("top")) styleObject.top = Number(styleCompiler.getItem("top"));
			if(styleCompiler.getItem("u")) styleObject.u = Number(styleCompiler.getItem("u"));
			if(styleCompiler.getItem("v")) styleObject.v = Number(styleCompiler.getItem("v"));
		}
		var format = null;
		if(l.format) {
			format = Silv.Compile(l.format, {});
		}
		var label = {
				name : l.name,
				fontsize : l.fontsize,
				property : l.property,
				custom : l.custom,
				format : format,
				style : l.style,
				styleObject : styleObject
		};
		return label;
	}
	
	EditorDef.ConnectionGraphic = function(cg) {
		this.id = cg.id;
		this.line_type = cg.line_type;
		this.source_arrow = cg.source_arrow;
		this.target_arrow = cg.target_arrow;
		this.labels = {};
		this.panels = {};
		for(var key in cg.labels) {
			this.labels[cg.labels[key].name] = createLabel(cg.labels[key]);
		}
		for(var key in cg.panels) {
			this.panels[key] = createPanel(cg.panels[key]);
		}
	}
	EditorDef.Label = function() {
		
	}
	if(window.clooca){
		if(window.clooca.diagrameditor){
			
		}else{
			window.clooca.diagrameditor = function(){};
		}
	}else{
		window.clooca = function(){};
		window.clooca.diagrameditor = function(){};
	}
	window.clooca.diagrameditor.EditorDef = EditorDef;

}());