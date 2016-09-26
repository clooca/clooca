/**
 * client/editor/diagrameditor/dnode.js
 * Copyright (C) 2013 Technical Rockstars Co.,Ltd. All Rights Reserved.
 * @author Shuhei Hiya
 */
(function(){
	
	var DiagramEditor = clooca.diagrameditor.DiagramEditor;
	function actor() {
		shape = document.createElementNS(SVG, 'g');
		var shape1 = document.createElementNS(SVG,'circle');
		var shape2 = document.createElementNS(SVG,'path');
		shape1.setAttribute('cx', 10);
		shape1.setAttribute('cy', 16);
		shape1.setAttribute('r', 10);
		shape2.setAttribute('d', "M " + 10 + " " + 26
						+" L " + 10 + " " + 40
						+" L " + 0 + " " + 60
						+" M " + 10 + " " + 40
						+" L " + 20 + " " + 60
						+" M " + 10 + " " + 26
						+" L " + 0 + " " + 36
						+" M " + 10 + " " + 26
						+" L " + 20 + " " + 36);
		shape.appendChild(shape2);
		shape.appendChild(shape1);
		return shape;
	}
	function smartphone() {
		shape = document.createElementNS(SVG, 'g');
		var shape1 = document.createElementNS(SVG,'rect');
		var shape2 = document.createElementNS(SVG,'rect');
		shape1.setAttribute('rx', 10);
		shape1.setAttribute('ry', 10);
		shape1.setAttribute('width', 60);
		shape1.setAttribute('height', 100);
		shape1.style.fill = "none";
		shape2.setAttribute('x', 5);
		shape2.setAttribute('y', 10);
		shape2.setAttribute('width', 50);
		shape2.setAttribute('height', 80);
		shape.appendChild(shape2);
		shape.appendChild(shape1);
		return shape;
	}
	function note() {
		shape = document.createElementNS(SVG, 'g');
		var shape1 = document.createElementNS(SVG,'path');
		shape1.setAttribute('d', "M " + 60 + " " + 7
						+" L " + 53 + " " + 0
						+" L " + 0 + " " + 0
						+" L " + 0 + " " + 80
						+" L " + 60 + " " + 80
						+" L " + 60 + " " + 7
						+" L " + 53 + " " + 7
						+" L " + 53 + " " + 0);
		shape.appendChild(shape1);
		return shape;
	}


	/**
	 * 
	 * @param _diagramEditor ダイアグラムエディタオブジェクト
	 * @param _metaEle メタ要素
	 * @param _data ノードデータ
	 */
	function Node(_diagramEditor, _metaNode, _data, base, option, parentNode) {
		var self = this;
		//ダイアグラムエディタ
		this.diagramEditor = _diagramEditor;
		//モデル要素と関連づける情報データ
		this.instanceData = _data;
		//ID
		this.id = this.instanceData.node._sys_parent_uri + "." + this.instanceData.node._sys_name;
		//Orign
		this.orig = null;
		//全体のスタイルを変更するときは、このグループにスタイルを適用する
		this.node_group = document.createElementNS(SVG, 'g');
		//Nodeの見た目を入れておくグループ
		this.scale_group = document.createElementNS(SVG, 'g');
		//パネルやラベルを入れるグループ
		this.panel_group = document.createElementNS(SVG, 'g');
		//小ノードを入れるグループ
		this.children_group = document.createElementNS(SVG, 'g');
		//当たり判定用グループ（一番手前）
		this.dammy_group = document.createElementNS(SVG, 'g');
		//当たり判定用の四角形
		this.rect = document.createElementNS(SVG,'rect');
		//位置
		this.pos = {x:0,y:0};
		//メタ要素
		//this.metaEle = _metaEle;
		//ノード情報
		this.metaNode = _metaNode;
		/*
		if(parentNode) {
			this.metaNode = parentNode.metaNode.getNode(this.metaEle.id);
		}else{
			this.metaNode = this.diagramEditor.metaDiagramInfo.getNode(this.metaEle.id);
		}
		*/
		//グラフィック定義
		console.log(this.metaNode);
		this.graphicConfig = this.diagramEditor.getGraphic(this.metaNode.graphic);
		if(!this.graphicConfig) throw {code:10,message:"Graphic Configration is not found."}
		//ディフォルトサイズ
		this.defaultSize = {width:0,height:0};
		//つながりを持つコネクション
		this.connections = [];
		//子ノード
		this.children = [];
		//親ノード
		this.parent = null;
		//プロパティパネル
		this.propertyPanels = {};
		//選択されているかどうか
		this.selected = false;
		this.base = base;
		var width = this.graphicConfig.defaultwidth;
		var height = this.graphicConfig.defaultheight;
		if(option.w && option.h) {
			width = option.w;
			height = option.h;
		}
		constructor(base);
		this.movePosition(option.x, option.y);
		this.setSize(width, height);
		function constructor(base) {
			//全てのグループを作成
			self.node_group.style.stroke = "black";
			self.rect.setAttribute("visibility", "hidden");
			self.rect.setAttribute("pointer-events", "fill");
			var shape = null;
			//Graphic定義に基づいて設定する
			if(self.graphicConfig.shape == "rect") {
				shape = document.createElementNS(SVG,'rect');
				shape.setAttribute('width', 80);
				shape.setAttribute('height', 40);
				self.defaultSize.width = 80;
				self.defaultSize.height = 40;
			}else if(self.graphicConfig.shape == "rounded") {
				shape = document.createElementNS(SVG,'rect');
				shape.setAttribute('rx', 10);
				shape.setAttribute('rx', 10);
				shape.setAttribute('width', 80);
				shape.setAttribute('height', 40);
				self.defaultSize.width = 80;
				self.defaultSize.height = 40;
			}else if(self.graphicConfig.shape == "circle") {
				shape = document.createElementNS(SVG,'circle');
				shape.setAttribute('cx', 10);
				shape.setAttribute('cy', 10);
				shape.setAttribute('r', 20);
				self.defaultSize.width = 20;
				self.defaultSize.height = 20;
			}else if(self.graphicConfig.shape == "actor") {
				shape = actor();
				self.defaultSize.width = 20;
				self.defaultSize.height = 60;
			}else if(self.graphicConfig.shape == "smartphone") {
				shape = smartphone();
				self.defaultSize.width = 60;
				self.defaultSize.height = 100;
			}else if(self.graphicConfig.shape == "note") {
				shape = note();
				self.defaultSize.width = 60;
				self.defaultSize.height = 80;
			}else{
				shape = document.createElementNS(SVG, 'g');
				for(var key in self.graphicConfig.shapes) {
					var shape1 = null;
					if(self.graphicConfig.shapes[key]._sys_meta == "metametamodel.FigureRect") {
						shape1 = document.createElementNS(SVG,'rect');
						shape1.setAttribute('x', self.graphicConfig.shapes[key].x);
						shape1.setAttribute('y', self.graphicConfig.shapes[key].y);
						shape1.setAttribute('width', self.graphicConfig.shapes[key].w);
						shape1.setAttribute('height', self.graphicConfig.shapes[key].h);
					}else if(self.graphicConfig.shapes[key]._sys_meta == "metametamodel.FigureLine") {
						shape1 = document.createElementNS(SVG,'svg:path');
						shape1.setAttribute('d', "M " + self.graphicConfig.shapes[key].x1 + " " + self.graphicConfig.shapes[key].y1
										+" L " + self.graphicConfig.shapes[key].x2 + " " + self.graphicConfig.shapes[key].y2);
					}else{
						var xlinkns = "http://www.w3.org/1999/xlink";
						shape = document.createElementNS(SVG,'use');
						shape.setAttributeNS(xlinkns, "href", "#" + self.graphicConfig.shapes[key].name);
						shape.setAttribute("x", self.graphicConfig.shapes[key].x);
						shape.setAttribute("y", self.graphicConfig.shapes[key].y);
						shape.setAttribute("width", self.graphicConfig.shapes[key].width);
						shape.setAttribute("height", self.graphicConfig.shapes[key].height);
						self.defaultSize.width = self.graphicConfig.shapes[key].width;
						self.defaultSize.height = self.graphicConfig.shapes[key].height;
						//shape1 = createFigure(self.graphicConfig.shapes[key].style);
					}
					if(shape && shape1){
						shape.appendChild(shape1);
					}
				}
			}
			//shape.setAttribute('width', self.defaultSize.width);
			//shape.setAttribute('height', self.defaultSize.height);
			self.scale_group.style.stroke = 'black';
			self.scale_group.style.fill = self.graphicConfig.color;
			self.scale_group.appendChild(shape);
			//self.scale_group.setAttribute('transform', "scale("+w / self.defaultSize.width+","+h / self.defaultSize.height+")");
			//self.scale_group.setAttribute('transform', "scale("+1+","+1+")");
			current_hposition = 0;
			self.dammy_group.appendChild(self.rect);
			for(var key in self.graphicConfig.panels) {
				var p = new clooca.diagrameditor.Panel(self.diagramEditor, self, current_hposition);
				p.create(self.graphicConfig.panels[key]);
				current_hposition += p.getHeight();
				self.panel_group.appendChild(p.getGroupSVGElement());
				self.propertyPanels[key] = p;
			}
			self.node_group.appendChild(self.scale_group);
			base.appendChild(self.node_group);
			base.appendChild(self.panel_group);
			base.appendChild(self.dammy_group);
			base.appendChild(self.children_group);
			//リスナーの設定
			self.rect.addEventListener("mouseover", function (e) {
				self.dammy_group.style.cursor = "all-scroll";
			}, false);
			self.rect.addEventListener("mouseout", function (e) {
				self.dammy_group.style.cursor = "default";
			}, false);
			self.rect.addEventListener("mousedown", function (e) {
				var eleminfo = self.diagramEditor.getSelectedTool();
				if(eleminfo) {
					if(eleminfo instanceof clooca.diagrameditor.EditorDef.Node) {
						//nodeの上にnode
						var mouseX = e.clientX - self.diagramEditor.getSVG().getBoundingClientRect().left;
						var mouseY = e.clientY - self.diagramEditor.getSVG().getBoundingClientRect().top;
						self.diagramEditor.addChildNode(mouseX-self.getX(),mouseY-self.getY(),
									80,30,
									self,
									eleminfo/*self.diagramEditor.getCompiledTool().getClass(eleminfo.metaElement)*/);
					}else if(eleminfo instanceof clooca.diagrameditor.EditorDef.Connection) {
						self.diagramEditor.startRubberband(self);
						self.diagramEditor.dragMode = DiagramEditor.DRAG_RUBBERBAND;
					}
				}else{
					self.diagramEditor.dragMode = DiagramEditor.DRAG_MOVE;
				    var ctm = self.rect.getCTM();
				    var _origPoint = self.diagramEditor.getSVG().createSVGPoint();
				    _origPoint.x = e.pageX;
				    _origPoint.y = e.pageY;
				    var origPoint = _origPoint.matrixTransform(ctm.inverse());
				    
				    self.orig = {
							x : Number(self.getLocalX()),
							y : Number(self.getLocalY()),
							pageX : origPoint.x,
							pageY : origPoint.y
				    };
				    self.diagramEditor.selectedObject.select(self);
				    self.select();
				}
			    //diagramEditor.setDragStartItem(self);
			}, false);
			self.rect.addEventListener("mouseup", function (e) {
				var diagramEditor = self.diagramEditor;
				if(diagramEditor.dragMode == DiagramEditor.DRAG_MOVE) {
					//self.orig = null;
					//selectedObject.clear();
					/*
					diagramEditor.Move(Number(self.getLocalX()),
							Number(self.getLocalY()),
							self);
					*/
					/*
					for(var i=0;i < self.connections.length;i++) {
						self.connections[i].refresh();
					}
					*/
				}else if(diagramEditor.dragMode == DiagramEditor.DRAG_RUBBERBAND) {
					//Connectionが一つの場合は勝手にとってくる
					var eleminfo = self.diagramEditor.getSelectedTool();
					if(eleminfo) {
						diagramEditor.addConnection(diagramEditor.endRubberband(self), self, eleminfo);
					}
					self.diagramEditor.setTool(null);
				}
			}, false);
		}
		function createFigure(style) {
				var result = null;
				var styleCompiler = new clooca.diagrameditor.StyleCompiler(style);
				console.log(styleCompiler.getItem("shape"));
				if(styleCompiler.getItem("shape") == "rect") {
					result = document.createElementNS(SVG,'rect');
					var x = 0,y = 0,rx=0,ry=0,width=60,height=30;
					if(styleCompiler.getItem("x")) x = styleCompiler.getItem("x");
					if(styleCompiler.getItem("y")) y = styleCompiler.getItem("y");
					if(styleCompiler.getItem("rx")) rx = styleCompiler.getItem("rx");
					if(styleCompiler.getItem("ry")) ry = styleCompiler.getItem("ry");
					if(styleCompiler.getItem("width")) width = styleCompiler.getItem("width");
					if(styleCompiler.getItem("height")) height = styleCompiler.getItem("height");
					result.setAttribute('x', x);
					result.setAttribute('y', y);
					result.setAttribute('rx', rx);
					result.setAttribute('ry', ry);
					result.setAttribute('width', width);
					result.setAttribute('height', height);
				}else if(styleCompiler.getItem("shape") == "circle") {
					
				}else if(styleCompiler.getItem("shape") == "actor") {
					result = actor();
				}else if(styleCompiler.getItem("shape") == "line") {
					var x = [], y = [];
					var str = "";
					for(var i=1;i < 10;i++) {
						if(styleCompiler.getItem("x"+i)) x[i] = styleCompiler.getItem("x"+i);
						if(styleCompiler.getItem("y"+i)) y[i] = styleCompiler.getItem("y"+i);
					}
					result = document.createElementNS(SVG,'svg:path');
					str = "M " + x[1] + " " + y[1];
					for(var i=2;i < x.length;i++) {
						str += " L " + x[i] + " " + y[i];
					}
					result.setAttribute('d', str);
				}
				return result;
		}
	}


	Node.prototype.getMeta = function() {
		return "Node";
	}

	/**
	 * 関連するモデル要素のURIを取得する。
	 */
	Node.prototype.getID = function() {
		return this.instanceData.instance._sys_parent_uri + "." + this.instanceData.instance._sys_name;
	}

	Node.prototype.getModelElement = function() {
		return this.instanceData.instance;
	}


	/**
	 * 関連するモデル要素（ノード情報の入ったモデル要素）のURIを取得する。
	 */
	Node.prototype.getNodeURI = function() {
		return this.instanceData.node._sys_parent_uri + "." + this.instanceData.node._sys_name;
	}

	/**
	 * プロパティからラベルを更新する。
	 * @param prop_id
	 * @param value
	 */
	Node.prototype.updateLabel = function(prop_id, value) {
		var label = this.findLabel(prop_id);
		//console.log("L", label);
		if(label) label.setValue(value);
		this.refreshPanels();
	}

	/**
	 * 
	 */
	Node.prototype.addLabel = function(propertyName, prop_id, value) {
		var label = this.findLabelCollection(propertyName);
		if(label) label.addLabel(prop_id, value);
	}

	Node.prototype.removeLabel = function(propertyName, prop_id) {
		var label = this.findLabelCollection(propertyName);
		if(label) {
			label.removeLabel(prop_id);
		}
	}


	/**
	 * プロパティからラベルを検索する。
	 */
	Node.prototype.findLabel = function(prop_id) {
		for(var key in this.propertyPanels) {
			var l = this.propertyPanels[key].findLabel(prop_id);
			if(l) return l;
		}
		return null;
	}

	/**
	 * プロパティからラベルを検索する。
	 */
	Node.prototype.findLabelCollection = function(propertyName) {
		for(var key in this.propertyPanels) {
			var l = this.propertyPanels[key].findLabelCollection(propertyName);
			if(l) return l;
		}
		return null;
	}

	Node.prototype.eachPanel = function(fn) {
		for(var key in this.propertyPanels) {
			fn(this.propertyPanels[key]);
		}
	}


	Node.prototype.refreshPanels = function() {
		var self = this;
		for(var key in this.propertyPanels) {
			this.propertyPanels[key].refresh();
			this.propertyPanels[key].resize(this.getW(), this.getH());
		}
	}

	/**
	 * ノードを移動させる
	 */
	Node.prototype.movePosition = function(x, y) {
		if(typeof x != "number" || typeof y != "number") throw {code:100,message:"Exception : setting not number value!"};
		if(this.pos.x == x && this.pos.y == y) {
			return false;
		}
		this.pos.x = x;
		this.pos.y = y;
		/*
		this.rect.setAttribute("x", x);
		this.rect.setAttribute("y", y);
		*/
		this.dammy_group.setAttribute('transform', "translate("+x+","+y+")");
		this.node_group.setAttribute('transform', "translate("+x+","+y+")");
		this.panel_group.setAttribute('transform', "translate("+x+","+y+")");
		this.children_group.setAttribute('transform', "translate("+x+","+y+")");
		this.refreshConnections();
		for(var i=0;i < this.children.length;i++) {
			this.children[i].refreshConnections();
		}
		if(this.parent) {
			//親の右端が、子の右端より小さければ
			if(this.parent.getRight() < this.getRight()) {
				this.parent.setW(this.getRight() - this.parent.getX());
			}
			if(this.parent.getBottom() < this.getBottom()) {
				this.parent.setH(this.getBottom() - this.parent.getY());
			}
		}
		return true;
	}

	Node.prototype.refreshConnections = function() {
		for(var i=0;i < this.connections.length;i++) {
			this.connections[i].refresh();
		}
	}


	/**
	 * ノードを消滅させる
	 */
	Node.prototype.destroy = function() {
		this.base.removeChild(this.node_group);
		this.base.removeChild(this.panel_group);
		this.base.removeChild(this.dammy_group);
		this.base.removeChild(this.children_group);
		//connectionの削除
		for(var i=0;i < this.connections.length;i++) {
			this.diagramEditor.removeElement(this.connections[i].getNodeURI(), true);
		}
	}

	Node.prototype.select = function(other) {
		this.node_group.style.stroke = "blue";
		if(other==undefined){
			this.diagramEditor.Select(this,false);
		}else{
			this.diagramEditor.Select(this,true);
		}
		this.selected = true;
	}

	Node.prototype.deselect = function(other) {
		this.node_group.style.stroke = "black";
		this.selected = false;
		if(other==undefined){
			this.diagramEditor.Deselect(this,false);
		}else{
			this.diagramEditor.Deselect(this,true);
		}
	}

	Node.prototype.addChild = function(node) {
		this.children.push(node);
		node.parent = this;
		//以下リフレッシュ
		this.refreshDisplay();
	}

	Node.prototype.refreshDisplay = function() {
		for(var i=0;i < this.children.length;i++) {
			var node = this.children[i];
			var flg = false;
			var w = this.getW();
			var h = this.getH();
			if(node.getRight() > this.getRight()) {
				w = node.getRight() - this.getX();
				flg = true;
			}
			if(node.getBottom() > this.getBottom()) {
				h = node.getBottom() - this.getY();
				flg = true;
			}
			if(flg) this.setSize(w, h);
		}
	}


	Node.prototype.addConnection = function(c) {
		this.connections.push(c);
	}

	Node.prototype.getX = function() {
		if(this.parent) {
			return Number(this.pos.x) + this.parent.getX();
		}
		return Number(this.pos.x);
	}
	Node.prototype.getY = function() {
		if(this.parent) {
			return Number(this.pos.y) + this.parent.getY();
		}
		return Number(this.pos.y);
	}
	Node.prototype.getW = function() {
		return Number(this.rect.getAttribute("width"));
	}
	Node.prototype.getH = function() {
		return Number(this.rect.getAttribute("height"));
	}
	Node.prototype.getRight = function() {
		return this.getX() + this.getW();
	}
	Node.prototype.getBottom = function() {
		return this.getY() + this.getH();
	}
	Node.prototype.getLocalX = function() {
		return Number(this.pos.x);
	}
	Node.prototype.getLocalY = function() {
		return Number(this.pos.y);
	}
	Node.prototype.getParent = function() {
		return this.parent;
	}

	Node.prototype.setSize = function(w, h) {
		this.setW(w);
		this.setH(h);
		for(var key in this.propertyPanels) {
			this.propertyPanels[key].resize(w, h);
		}
	}
	Node.prototype.setW = function(w) {
		if(w > 0) {
			this.rect.setAttribute("width", w);
			this.scale_group.setAttribute('transform', "scale("+w/this.defaultSize.width+","+this.getH()/this.defaultSize.height+")");
		}
	}
	Node.prototype.setH = function(h) {
		if(h > 0) {
			this.rect.setAttribute("height", h);
			this.scale_group.setAttribute('transform', "scale("+this.getW()/this.defaultSize.width+","+h/this.defaultSize.height+")");
		}
	}

	Node.prototype.getCollGroup = function() {
		return this.dammy_group;
	}
	Node.prototype.getPanelGroup = function() {
		return this.panel_group;
	}
	Node.prototype.getChildrenGroup = function() {
		return this.children_group;
	}
	Node.prototype.getRect = function() {
		return this.rect;
	}
	Node.prototype.getOrig = function() {
		return this.orig;
	}
	Node.prototype.getMetaElement = function() {
		return this.metaEle;
	}

	Node.prototype.getMetaNode = function() {
		return this.metaNode;
	}

	Node.prototype.getDiagramEditor = function() {
		return this.diagramEditor;
	}
	
	Node.prototype.highlight = function(col) {
		this.scale_group.style.fill = col;
		this.scale_group.style.stroke = col;
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
	window.clooca.diagrameditor.Node = Node;

}());