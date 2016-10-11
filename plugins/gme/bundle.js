(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _GraphiticalModelEdit;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @author Shuhei Hiya
 */

/**
 * 
 * @param key
 * @param name
 * @param diagram:ダイアグラム(モデル要素への参照集合)
 * @param modelController：モデル要素へのインターフェイス
 * @returns
 */
GraphiticalModelEditor.marker = '\
		<marker viewBox="0 -5 10 10" refX="10" refY="0"\
    	markerWidth="10" markerHeight="10" id="mk-v"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polyline points="0,-5 10,0 0,5" fill="none" stroke="black"/>\
		</marker>\
		<marker viewBox="0 -5 10 10" refX="10" refY="0"\
    	markerWidth="10" markerHeight="10" id="mk-triangle"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polygon points="10,0 0,5 0,-5" stroke="black" fill="white" />\
		</marker>\
		<marker viewBox="0 -5 10 10" refX="10" refY="0"\
    	markerWidth="10" markerHeight="10" id="mk-black_triangle"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polygon points="10,0 0,5 0,-5" />\
		</marker>\
		<marker viewBox="-10 -5 20 10" refX="10" refY="0"\
    	markerWidth="20" markerHeight="10" id="mk-diamond"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polygon points="10,0 0,5 -10,0 0,-5" stroke="black" fill="white" />\
		</marker>\
		<marker viewBox="-10 -5 20 10" refX="10" refY="0"\
    	markerWidth="20" markerHeight="10" id="mk-black_diamond"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polygon points="10,0 0,5 -10,0 0,-5" />\
		</marker>\
		<marker viewBox="0 -5 10 10" refX="0" refY="0"\
    	markerWidth="10" markerHeight="10" id="mk-start-v"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polyline points="10,-5 0,0 10,5" fill="none" stroke="black"/>\
		</marker>\
		<marker viewBox="0 -5 10 10" refX="0" refY="0"\
    	markerWidth="10" markerHeight="10" id="mk-start-triangle"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polygon points="0,0 10,5 10,-5" stroke="black" fill="white" />\
		</marker>\
		<marker viewBox="0 -5 10 10" refX="0" refY="0"\
    	markerWidth="10" markerHeight="10" id="mk-start-black_triangle"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polygon points="0,0 10,5 10,-5" />\
		</marker>\
		<marker viewBox="-10 -5 20 10" refX="-10" refY="0"\
    	markerWidth="20" markerHeight="10" id="mk-start-diamond"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polygon points="10,0 0,5 -10,0 0,-5" stroke="black" fill="white" />\
		</marker>\
		<marker viewBox="-10 -5 20 10" refX="-10" refY="0"\
    	markerWidth="20" markerHeight="10" id="mk-start-black_diamond"\
    	markerUnits="userSpaceOnUse" orient="auto">\
    	<polygon points="10,0 0,5 -10,0 0,-5" />\
		</marker>\
		<marker viewBox="-10 -10 20 20" refX="0" refY="0"\
    	markerWidth="20" markerHeight="10" id="mk-circle"\
    	markerUnits="userSpaceOnUse" orient="auto">\
		<circle cx="0" cy="0" r="10" stroke="black" fill="white" />\
		</marker>\
		<marker viewBox="-10 -10 20 20" refX="0" refY="0"\
    	markerWidth="20" markerHeight="10" id="mk-black_circle"\
    	markerUnits="userSpaceOnUse" orient="auto">\
		<circle cx="0" cy="0" r="10" stroke="black" fill="black" />\
		</marker>\
		<symbol id="svg2" viewBox="0 0 640 480" >\
		<rect height="59" width="101" y="13" x="10" stroke-linecap="null" stroke-linejoin="null" stroke-width="5" stroke="#000000" fill="#7f00ff"/>\
		</symbol>';

GraphiticalModelEditor.macroOperation = (_GraphiticalModelEdit = {
	onNodeAdded: {
		name: "onNodeAdded"
	},
	onChildAdded: {
		name: "onChildAdded"
	},
	onConnectionAdded: {
		name: "onConnectionAdded"
	},
	onNodeMoved: {
		name: "onNodeMoved"
	},
	onNodeResized: {
		name: "onNodeResized"
	},
	onPointMoved: {
		name: "onPointMoved"
	},
	onNodeRemovedFromDiagram: {
		name: "onNodeRemovedFromDiagram"
	},
	onNodeRemovedFromModel: {
		name: "onNodeRemovedFromModel"
	},
	onConnectionRemovedFromModel: {
		name: "onConnectionRemovedFromModel"
	}
}, _defineProperty(_GraphiticalModelEdit, "onConnectionRemovedFromModel", {
	name: "onConnectionRemovedFromModel"
}), _defineProperty(_GraphiticalModelEdit, "onSelected", {
	name: "onSelected"
}), _GraphiticalModelEdit);

function GraphiticalModelEditor(_key, _name, _diagram, _dinfo, _editordef, _modelController, _ctool, _editor, option) {
	var editor_key = _key;
	var name = _name;
	var diagram = _diagram;
	var dinfo = _dinfo;
	var editordef = _editordef;
	var modelController = _modelController;
	var pkg = modelController.getContainer(diagram);
	var ctool = _ctool;
	var metadiagram = ctool.getClass(diagram._sys_meta);
	var editorContext = _editor;
	var width = option.width ? option.width : 500;
	var height = option.height ? option.height : 500;
	var editor = null;
	var macroOperation = GraphiticalModelEditor.macroOperation;

	/*
  * モデル要素のURIから図要素情報を取得する。
  */
	function getNodeInfo(uri) {
		for (var key in diagram._nodes) {
			if (uri == diagram._nodes[key].uri) {
				return diagram._nodes[key];
			}
		}
		return null;
	}

	/*
  * 初めてダイアグラムエディタを開いたときに、ダイアグラムの表示を初期化する。
  */
	function initDiagram() {
		var nodemap = {};
		//diagramと関連がある、ノードを表示する
		consistRootNode();
		consistConnection();
		//start of あるノードからの関連先がノードであった場合の処理
		/*
  for(var uri in nodemap) {
  	var elem = modelController.get(uri);
  	var metaEle = ctool.getClass(elem._sys_meta);
  	for(var akey in metaEle.associations) {
  		console.log("DEBUG",akey);
  		var asso = metaEle.associations[akey];
  		if(asso.containment==false && asso.lower==1 && asso.upper==1) {
  			if(nodemap[elem[asso.name]] && asso.graphic) {
  				var connection = editor.addConnection(nodemap[elem[asso.name]], nodemap[uri], ctool.getClass(elem._sys_meta), {
  					instance:elem,
  					connection:
  					graphic:asso.graphic
  				});
  			}
  		}
  	}
  }
  */
		//end of あるノードからの関連先がノードであった場合の処理
		function consistRootNode() {
			//メタノードを走査
			for (var key in dinfo.nodes) {
				var metaElementId = dinfo.nodes[key].metaElement;
				var asso = ctool.getAssociation(dinfo.nodes[key].containFeature);
				if (ctool.getParentClass(dinfo.nodes[key].containFeature).id == diagram._sys_meta) {
					for (var k in diagram[asso.name]) {
						var elem = diagram[asso.name][k];
						if (elem._sys_meta == metaElementId) {
							consistRootNode2(elem, dinfo.nodes[key]);
						}
					}
				} else if (ctool.getParentClass(dinfo.nodes[key].containFeature).id == pkg._sys_meta) {
					for (var k in pkg[asso.name]) {
						var elem = pkg[asso.name][k];
						if (elem._sys_meta == metaElementId) {
							consistRootNode2(elem, dinfo.nodes[key]);
						}
					}
				}
			}
			function consistRootNode2(elem, metaNode) {
				if (elem == null) return;
				var uri = modelController.getURI(elem);
				var metaEle = ctool.getClass(elem._sys_meta);
				var nodeInfo = getNodeInfo(uri);
				if (nodeInfo == null) return;
				nodemap[uri] = editor.addNode(nodeInfo.x, nodeInfo.y, nodeInfo.w, nodeInfo.h, metaNode, {
					instance: elem,
					node: nodeInfo
				});
				initLabel(nodemap[uri], elem, metaEle);
				nodemap[uri].refreshPanels();
				consistNode(elem, metaNode);
			}
		}
		function consistNode(parent, metaNode) {
			var metaElement = ctool.getClass(parent._sys_meta);
			var contains = [];
			for (var k in metaNode.children) {
				var asso = ctool.getAssociation(metaNode.children[k].containFeature);
				if (ctool.getParentClass(metaNode.children[k].containFeature).id == parent._sys_meta) {
					var elems = {};
					for (var l in parent[asso.name]) {
						if (parent[asso.name][l]._sys_meta == metaNode.children[k].metaElement) {
							elems[l] = parent[asso.name][l];
						}
					}
					contains.push({
						elems: elems,
						metaNode: metaNode.children[k] });
				}
			}
			for (var i = 0; i < contains.length; i++) {
				for (var key in contains[i].elems) {
					var elem = contains[i].elems[key];
					var uri = modelController.getURI(elem);
					var metaEle = ctool.getClass(elem._sys_meta);
					var nodeInfo = getNodeInfo(uri);
					if (nodeInfo == null) continue;
					var x = nodeInfo.x;
					var y = nodeInfo.y;
					var w = nodeInfo.w;
					var h = nodeInfo.h;
					parentNode = nodemap[modelController.getURI(parent)];
					nodemap[uri] = editor.addChildNode(x, y, w, h, parentNode, contains[i].metaNode, {
						instance: elem,
						node: nodeInfo
					});
					initLabel(nodemap[uri], elem, metaEle);
					consistNode(elem, contains[i].metaNode);
				}
			}
		}
		function consistConnection() {
			for (var key in diagram._connections) {
				var elem = modelController.get(diagram._connections[key].uri);
				if (!elem) continue;
				var metaElement = ctool.getClass(elem._sys_meta);
				var cinfo = dinfo.getConnectionByClass(metaElement);
				var sourceAssociation = ctool.getAssociation(cinfo.sourceFeature);
				var targetAssociation = ctool.getAssociation(cinfo.targetFeature);
				var source = elem[sourceAssociation.name];
				var target = elem[targetAssociation.name];
				if (!nodemap[source]) continue;
				if (!nodemap[target]) continue;
				var connection = editor.addConnection(nodemap[source], nodemap[target], cinfo, {
					instance: elem,
					connection: diagram._connections[key]
				});
				var points = [];
				for (var i = 1; i <= 3; i++) {
					if (typeof diagram._connections[key]["x" + i] == "number" && diagram._connections[key]["x" + i] != 0) {
						points.push({
							x: diagram._connections[key]["x" + i],
							y: diagram._connections[key]["y" + i]
						});
					}
				}
				connection.setPoint(points);
				for (var pkey in metaElement.properties) {
					var propertyName = metaElement.properties[pkey].name;
					if (metaElement.properties[pkey].upper == 1) {
						connection.updateLabel(propertyName, elem[propertyName]);
					} else {
						//コネクションは多重度１以上のプロパティの表示に対応しない
						/*
      var text = [];
      for(var k in elem[propertyName]) {
      	var prop = elem[propertyName][k];
      	text.push(prop[prop._sys_id]);
      }
      connection.addText(propertyName, text);
      */
					}
				}
			}
		}
	}

	function removeNodeFromDiagram() {}

	function removeConnectionFromDiagram() {}

	function removeNodeFromModel(selectedNode) {
		var result = modelController.macroOperation(macroOperation.onNodeRemovedFromModel.name, editor_key, function (mc) {
			var uri = selectedNode.getID();
			var nodeURI = selectedNode.getNodeURI();
			mc.removeInstance(uri, editor_key);
			editor.removeElement(nodeURI, true);
			var return_object = {
				id: uri,
				nodeURI: nodeURI,
				metaNode: selectedNode.getMetaNode().name
			};
			if (selectedNode.getParent()) {
				return_object.parentURI = selectedNode.getParent().getID();
				return_object.parentNodeURI = selectedNode.getParent().getNodeURI();
				return_object.parentMetaNode = selectedNode.getParent().getMetaNode().name;
			}
			return return_object;
		}, editor_key);
	}

	function removeConnectionFromModel(selectedConnection) {
		var result = modelController.macroOperation(macroOperation.onConnectionRemovedFromModel.name, editor_key, function (mc) {
			var uri = selectedConnection.getID();
			var connectionURI = selectedConnection.getNodeURI();
			mc.removeInstance(uri, editor_key);
			editor.removeElement(connectionURI, true);
			return {
				id: uri,
				connectionURI: connectionURI,
				startURI: selectedConnection.getStart().getNodeURI(),
				endURI: selectedConnection.getEnd().getNodeURI(),
				metaConnection: selectedConnection.getMetaConnection().name
			};
		}, editor_key);
	}

	function addNode() {}

	function addChildNode() {}

	function addConnection() {}

	function showContextMenu(x, y) {
		var self = this;
		var menu = [];
		var mnuContext = new Ext.menu.Menu({
			items: [{
				text: $G('remove-from-diagram'),
				handler: function handler() {
					if (editor.getSelectedObject().isSelected()) {
						var uri = editor.getSelectedObject().getSelectedData().getID();
						var nodeURI = editor.getSelectedObject().getSelectedData().getNodeURI();
						editor.removeElement(nodeURI, true);
					} else {
						Ext.Msg.alert("", "要素が選択されていません");
					}
				}
			}, {
				text: $G('remove-from-model'),
				handler: function handler() {
					if (editor.getSelectedObject().isSelected()) {
						var selectedElement = editor.getSelectedObject().getSelectedData();
						if (selectedElement.getMeta() == "Node") {
							removeNodeFromModel(selectedElement);
						} else {
							removeConnectionFromModel(selectedElement);
						}
					} else {
						Ext.Msg.alert("", "要素が選択されていません");
					}
				}
			}, {
				text: $G('put-from-modelexplorer'),
				handler: function handler() {
					var explorer = null;
					if (g_projectinfo.type == "tool") {
						explorer = editorContext.metaPackageExplorer;
					} else {
						explorer = editorContext.modelExplorer;
					}
					if (explorer && explorer.selected) {} else {
						Ext.Msg.alert("", "要素が選択されていません");
						return;
					}
					var elem_uri = explorer.selected;
					var elem = modelController.get(elem_uri);
					if (!elem) throw "unknown uri";
					if (editor.getElementByURI(elem_uri)) {
						Ext.Msg.alert("既に図中に存在します。");
						return;
					}
					//ノード情報付けて
					var ninfo = dinfo.getNode(elem._sys_meta);
					if (ninfo) {
						var nodeClass = ctool.getClass("Editor.DiagramEditor.Node");
						var addedNodeInstance = modelController.addInstanceRaw(diagram, metadiagram.associations._nodes, nodeClass, editor_key);
						modelController.updateProperties(addedNodeInstance, { x: Math.floor(x),
							y: Math.floor(y),
							w: 80,
							h: 40,
							uri: modelController.getURI(elem) }, editor_key);
						socket.send({ event: "onNodeAdded",
							editor: editor_key,
							object: {
								instanceURI: modelController.getURI(elem),
								nodeURI: modelController.getURI(addedNodeInstance)
							}
						});
						var addedNode = editor.addNode(addedNodeInstance.x, addedNodeInstance.y, addedNodeInstance.w, addedNodeInstance.h, ninfo, {
							instance: elem,
							node: addedNodeInstance
						});
						//ラベル更新
						initLabel(addedNode, elem, ctool.getClass(elem._sys_meta));
					} else {
						var cinfo = dinfo.getConnection(elem._sys_meta);
						var connectionClass = ctool.getClass("Editor.DiagramEditor.Connection");

						var sourceAssociation = ctool.getAssociation(cinfo.sourceFeature);
						var targetAssociation = ctool.getAssociation(cinfo.targetFeature);
						var start = editor.getElementByURI(elem[sourceAssociation.name]);
						var end = editor.getElementByURI(elem[targetAssociation.name]);
						if (start && end) {
							var addedConnectionInstance = modelController.addInstanceRaw(diagram, metadiagram.associations._connections, connectionClass, editor_key);
							modelController.updateProperties(addedConnectionInstance, { uri: modelController.getURI(elem) }, editor_key);
							socket.send({ event: "onConnectionAdd",
								editor: editor_key,
								object: {
									instanceURI: modelController.getURI(elem),
									connectionURI: modelController.getURI(addedConnectionInstance),
									startURI: start.getNodeURI(),
									endURI: end.getNodeURI()
								}
							});
							var addedConnection = editor.addConnection(start, end, cinfo, {
								instance: elem,
								connection: addedConnectionInstance
							});
							//ラベル更新
							initLabel(addedConnection, elem, ctool.getClass(elem._sys_meta));
						}
					}
				}
			}, {
				text: $G('add-point'),
				handler: function handler() {
					if (editor.getSelectedObject().isSelected() && editor.getSelectedObject().getSelectedData().getMeta() == "Connection") {
						var connection = editor.getSelectedObject().getSelectedData();
						connection.addPoint(0, 0);
					} else {
						Ext.Msg.alert("", "要素が選択されていません");
					}
				}
			}]
		});
		mnuContext.showAt(x, y);
	}
	var createToolButton = function createToolButton() {
		toolButtons = [];
		function basetool(t) {
			t.xtype = 'button';t.enableToggle = true;t.toggleGroup = 'tools';return t;
		}
		Ext.getCmp("toolbutton" + editor_key).add(basetool({
			id: "toolbutton" + editor_key + "-select",
			text: 'SELECT',
			listeners: {
				toggle: {
					fn: function fn(btn, pressed) {
						if (pressed) editor.setTool(null);
					}
				}
			}
		}));
		for (var i = 0; i < dinfo.toolpallet.length; i++) {
			var icon = null;
			if (dinfo.toolpallet[i].icon) {
				icon = "tool-base tool-" + dinfo.toolpallet[i].icon;
			}
			var tool = {
				key: i,
				listeners: {
					toggle: {
						fn: function fn(btn, pressed) {
							if (pressed) editor.setTool(dinfo.toolpallet[btn.key]);
						}
					}
				}
			};
			if (icon) {
				tool.iconCls = icon;
				tool.scale = "large";
				tool.tooltip = "<p>" + dinfo.toolpallet[i].text + "</p>";
			} else {
				tool.text = dinfo.toolpallet[i].text;
			}
			Ext.getCmp("toolbutton" + editor_key).add(basetool(tool));
		}
	};
	//start of 基本パネルの作成
	var svg_style = ""; //svgのstyle記述
	//ドラッグのテキストコピー禁止用
	svg_style += "user-select: none;-moz-user-select: none;-webkit-user-select: none;-ms-user-select: none;";
	//背景等
	svg_style += "background-color: white;width: 100%;height: 100%;min-width: 2021px;min-height: 2307px;position: absolute;";
	var marker = GraphiticalModelEditor.marker;
	for (var gkey in ctool.graphics) {
		for (var skey in ctool.graphics[gkey].shapes) {
			var figure_svg = ctool.graphics[gkey].shapes[skey];
			marker += '<symbol id="' + figure_svg.name + '" viewBox="' + figure_svg.x + ' ' + figure_svg.y + ' ' + figure_svg.width + ' ' + figure_svg.height + '" >';
			marker += ctool.graphics[gkey].shapes[skey].svg;
			marker += '</symbol>';
		}
	}
	var panel = createDom();

	function createDom() {
		var mainDom = document.createElement('div');

		var toolboxDom = document.createElement('div');

		var canvasDom = document.createElement('div');
		canvasDom.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="gme-svg" style = "' + svg_style + '">' + marker + '</svg>';

		mainDom.appendChild(toolboxDom);
		mainDom.appendChild(canvasDom);
		return mainDom;
	}
	//end of 基本パネルの作成

	function initLabel(delem, elem, metaEle) {
		for (var pkey in metaEle.properties) {
			var propertyName = metaEle.properties[pkey].name;
			if (metaEle.properties[pkey].lower == 1 && metaEle.properties[pkey].upper == 1) {
				delem.updateLabel(propertyName, elem[propertyName]);
			} else {
				if (clooca.CompiledTool.checkPrimitiveType(metaEle.properties[pkey].type)) {
					for (var k in elem[propertyName]) {
						var prop = elem[propertyName][k];
						delem.addLabel(propertyName, k, prop);
					}
				} else {
					for (var k in elem[propertyName]) {
						var prop = elem[propertyName][k];
						delem.addLabel(propertyName, k, prop);
					}
				}
			}
		}
		delem.refreshPanels();
	}
	return {
		getPanel: function getPanel() {
			return panel;
		},
		Initialize: function Initialize() {
			var self = this;
			svg = document.getElementById('gme-svg');
			var editfield = document.getElementById('editfield-' + editor_key);
			editor = new clooca.diagrameditor.DiagramEditor(editor_key, svg, editfield, diagram, pkg, dinfo, editordef, modelController, ctool, editorContext.editorTabPanel);
			//start of setting key event
			/*
   $('editfield-'+editor_key).keydown(function(e){
   	console.log(e.keyCode);
   	if(e.metaKey || e.ctrlKey) {
   		if(e.keyCode == "67") {
   			//copy element
   		}else if(e.keyCode == "68") {
   			//remove element
   		}else if(e.keyCode == "86") {
   			//paste element
   		}else if(e.keyCode == "88") {
   			//cut element
   		}else if(e.keyCode == "89") {
   			editorContext.historyController.redo();
   		}else if(e.keyCode == "90") {
   			editorContext.historyController.undo();
   		}
   	}
   	return false;
   });
   */
			//end of setting key event
			editor.on("onInit", initDiagram);
			editor.on("onMoved", function (e) {
				var result = modelController.macroOperation(macroOperation.onNodeMoved.name, editor_key, function (mc) {
					var nodeInstance = modelController.get(e.target.getNodeURI());
					modelController.updateProperties(nodeInstance, {
						x: Math.floor(e.x) - (e.target.getParent() == null ? 0 : e.target.getParent().getX()),
						y: Math.floor(e.y) - (e.target.getParent() == null ? 0 : e.target.getParent().getY())
					}, editor_key);
					return {
						id: e.target.getID(),
						nodeURI: e.target.getNodeURI()
					};
				}, editor_key);
			});
			editor.on("onMovePoint", function (e) {
				var result = modelController.macroOperation(macroOperation.onPointMoved.name, editor_key, function (mc) {
					var nodeInstance = modelController.get(e.target.getNodeURI());
					var changes = {};
					changes["x" + (e.index + 1)] = Math.floor(e.x);
					changes["y" + (e.index + 1)] = Math.floor(e.y);
					modelController.updateProperties(nodeInstance, changes, editor_key);
					return {
						id: e.target.getID(),
						nodeURI: e.target.getNodeURI()
					};
				}, editor_key);
			});
			editor.on("onResized", function (e) {
				var result = modelController.macroOperation(macroOperation.onNodeResized.name, editor_key, function (mc) {
					var nodeInstance = mc.get(e.target.getNodeURI());
					mc.updateProperties(nodeInstance, { w: Math.floor(e.w), h: Math.floor(e.h) }, editor_key);
					return {
						id: e.target.getID(),
						nodeURI: e.target.getNodeURI()
					};
				}, editor_key);
			});
			editor.on("onSelected", function (e) {
				editorContext.propertyPanel.refresh(modelController.get(e.target.getID()), false);
			});
			editor.on("onDblClick", function (e) {
				if (e.propertyName == e.propid) {
					editorContext.propertyPanelSub.refresh(modelController.get(e.instanceURI), false);
					editorContext.propertyPanelWindow.show();
				} else {
					editorContext.propertyPanelSub.refresh(modelController.get(e.instanceURI + "." + e.propertyName + "." + e.propid), false);
					editorContext.propertyPanelWindow.show();
				}
			});
			editor.setAddNodeListenner(function (e) {
				var result = modelController.macroOperation(macroOperation.onNodeAdded.name, editor_key, function (mc) {
					var addedInstance = null;
					var ninfo = e.metaNode; //dinfo.getNode(e.metaElement.id);
					var asso = ctool.getAssociation(ninfo.containFeature);
					console.log("asso", asso);
					if (ctool.getParentClass(ninfo.containFeature).id == diagram._sys_meta) {
						addedInstance = mc.addInstance(diagram, asso, e.metaElement, editor_key);
					} else if (ctool.getParentClass(ninfo.containFeature).id == pkg._sys_meta) {
						addedInstance = mc.addInstance(pkg, asso, e.metaElement, editor_key);
						//modelController.associate(diagram, addedInstance, editor_key);
					}
					if (addedInstance == null) return null;

					var nodeClass = ctool.getClass("Editor.DiagramEditor.Node");
					var addedNodeInstance = mc.addInstanceRaw(diagram, metadiagram.associations._nodes, nodeClass, editor_key);
					mc.updateProperties(addedNodeInstance, { x: e.x | 0,
						y: e.y | 0,
						w: e.w,
						h: e.h,
						uri: modelController.getURI(addedInstance) }, editor_key);
					return {
						instanceURI: mc.getURI(addedInstance),
						nodeURI: mc.getURI(addedNodeInstance),
						metaNode: ninfo.name
					};
				}, editor_key);
				if (result == null) return null;
				Ext.getCmp("toolbutton" + editor_key + "-select").toggle(true, false);

				return {
					instance: modelController.get(result.instanceURI),
					node: modelController.get(result.nodeURI)
				};
			});
			editor.setAddChildListenner(function (e) {

				var parentElement = modelController.get(e.parent.getID());
				if (!parentElement) {
					throw "Undefined Exception while adding child node in DiagramEditor.";
					return null;
				}
				var parentMetaElement = ctool.getClass(parentElement._sys_meta);
				var parent_ninfo = e.parentMetaNode;
				var addedInstance = null;
				var ninfo = e.metaNode;
				if (!ninfo) return null;
				var asso = ctool.getAssociation(ninfo.containFeature);
				var result = modelController.macroOperation(macroOperation.onChildAdded.name, editor_key, function (mc) {
					addedInstance = modelController.addInstance(parentElement, asso, e.metaElement, editor_key);
					if (addedInstance == null) return null;
					//modelController.associate(diagram, addedInstance, editor_key);

					var nodeClass = ctool.getClass("Editor.DiagramEditor.Node");

					var addedNodeInstance = modelController.addInstance(diagram, metadiagram.associations._nodes, nodeClass, editor_key);

					modelController.updateProperties(addedNodeInstance, { x: Math.floor(e.x),
						y: Math.floor(e.y),
						w: e.w,
						h: e.h,
						uri: modelController.getURI(addedInstance) }, editor_key);
					return {
						instanceURI: modelController.getURI(addedInstance),
						nodeURI: modelController.getURI(addedNodeInstance),
						parentURI: e.parent.getID(),
						parentNodeURI: e.parent.getNodeURI(),
						parentMetaNode: parent_ninfo.name,
						metaNode: ninfo.name
					};
				}, editor_key);
				if (result == null) return null;
				Ext.getCmp("toolbutton" + editor_key + "-select").toggle(true, false);
				return {
					instance: addedInstance,
					node: modelController.get(result.nodeURI)
				};
			});
			editor.setAddConnectionListenner(function (e) {
				//contain
				var start = modelController.get(e.start.getID());
				var end = modelController.get(e.end.getID());

				var cinfo = e.metaConnection;
				console.log("addConnection", cinfo);
				//var cinfo = dinfo.getConnection(e.metaElement.id);
				console.log(cinfo);
				var added_instance = null;

				var result = modelController.macroOperation(macroOperation.onConnectionAdded.name, editor_key, function (mc) {
					var containAssociation = ctool.getAssociation(cinfo.containFeature);
					if (ctool._can_Contain(cinfo.containFeature, start._sys_meta)) {
						added_instance = modelController.addInstance(start, containAssociation, e.metaElement, editor_key);
					} else if (ctool._can_Contain(cinfo.containFeature, diagram._sys_meta)) {
						added_instance = modelController.addInstance(diagram, containAssociation, e.metaElement, editor_key);
					}
					if (!added_instance) return null;
					var sourceAssociation = ctool.getAssociation(cinfo.sourceFeature);
					var targetAssociation = ctool.getAssociation(cinfo.targetFeature);
					//source
					if (!modelController.associate(added_instance, sourceAssociation, start, editor_key)) return null;
					//target
					if (!modelController.associate(added_instance, targetAssociation, end, editor_key)) return null;

					var connectionClass = ctool.getClass("Editor.DiagramEditor.Connection");
					var addedConnectionInstance = modelController.addInstanceRaw(diagram, metadiagram.associations['_connections'], connectionClass, editor_key);
					modelController.updateProperty(addedConnectionInstance, "uri", null, modelController.getURI(added_instance), editor_key);
					return {
						instanceURI: modelController.getURI(added_instance),
						connectionURI: modelController.getURI(addedConnectionInstance),
						startURI: e.start.getNodeURI(),
						endURI: e.end.getNodeURI(),
						metaConnection: cinfo.name
					};
				}, editor_key);
				if (result == null) return null;
				Ext.getCmp("toolbutton" + editor_key + "-select").toggle(true, false);
				return {
					instance: modelController.get(result.instanceURI),
					connection: modelController.get(result.connectionURI)
				};
			});
			editor.Initialize();
			if (!option.readonly) createToolButton();

			//右クリックメニュー
			svg.addEventListener("mouseup", function (e) {
				if (e.button == 2) {
					showContextMenu(e.clientX, e.clientY);
				}
			});
			//real-time
			if (socket != undefined && editorContext.editorManager) {
				editorContext.editorManager.addEditor(editor_key, self);
			}
		},
		onActivate: function onActivate() {},
		onDeactivate: function onDeactivate() {},
		onClose: function onClose() {
			if (editorContext.editorManager) {
				editorContext.editorManager.removeEditor(editor_key);
			}
			editor.onClose();
		},
		onResize: function onResize(w, h) {
			panel.setWidth(w);
			svg_panel.setWidth(w);
			panel.setHeight(h);
			svg_panel.setHeight(h - 20);
		},
		//idはノード、コネクションのID
		selectByOther: function selectByOther(id) {
			var node = editor.getElement(id);
		},
		//idはノード、コネクションのID
		deselectByOther: function deselectByOther(id) {
			var node = editor.getElement(id);
		},
		//idはノードのID
		moveByOther: function moveByOther(id, nodeElem) {
			var node = editor.getElement(id);
			console.log(node);
			if (node) {
				node.movePosition(nodeElem.x, nodeElem.y);
			}
		},
		//idはコネクションのID
		movePointByOther: function movePointByOther(id) {
			var connection = editor.getElement(id);
			var nodeElem = modelController.get(id);
			if (connection && nodeElem) {
				var points = [];
				for (var i = 1; i <= 3; i++) {
					if (typeof nodeElem["x" + i] == "number" && nodeElem["x" + i] != 0) {
						points.push({
							x: nodeElem["x" + i],
							y: nodeElem["y" + i]
						});
					}
				}
				connection.setPoint(points);
				connection.refresh();
			}
		},
		//idはノードのID
		resizeByOther: function resizeByOther(id, nodeElem) {
			var node = editor.getElement(id);
			if (node) {
				node.setSize(nodeElem.w, nodeElem.h);
			}
		},
		addNodeByOther: function addNodeByOther(instance, nodeInstance, metaNodeName) {
			for (var key in dinfo.nodes) {
				if (dinfo.nodes[key].name == metaNodeName) {
					var addedNode = editor.addNode(nodeInstance.x, nodeInstance.y, nodeInstance.w, nodeInstance.h, dinfo.nodes[key], {
						instance: instance,
						node: nodeInstance
					});
					//ラベル更新
					initLabel(addedNode, instance, ctool.getClass(instance._sys_meta));
					break;
				}
			}
			//console.log("addNodeByOther" ,nodeInstance.x, nodeInstance.y, nodeInstance.w, nodeInstance.h);
		},
		addChildNodeByOther: function addChildNodeByOther(instance, nodeInstance, parentInstance, parentNodeURI, parentMetaNodeName, metaNodeName) {
			for (var key in dinfo.nodes) {
				if (dinfo.nodes[key].name == parentMetaNodeName) {
					var metaNode = dinfo.nodes[key].getNodeByName(metaNodeName);
					var parentInstanceURI = modelController.getURI(parentInstance);
					editor.addChildNode(nodeInstance.x, nodeInstance.y, nodeInstance.w, nodeInstance.h, editor.getElement(parentNodeURI), metaNode, {
						instance: instance,
						node: nodeInstance
					});
					break;
				}
			}
		},
		addConnectionByOther: function addConnectionByOther(instance, nodeInstance, startURI, endURI, metaConnectionName) {
			for (var key in dinfo.connections) {
				if (dinfo.connections[key].name == metaConnectionName) {
					editor.addConnection(editor.getElement(startURI), editor.getElement(endURI), dinfo.connections[key], {
						instance: instance,
						connection: nodeInstance
					});
				}
			}
		},
		execute_onNodeAdded: function execute_onNodeAdded(opResult) {
			opResult.eventObject.instanceURI;
			opResult.eventObject.nodeURI;
			opResult.operationResults;
			var addedNode = editor.addNode(nodeInstance.x, nodeInstance.y, nodeInstance.w, nodeInstance.h, ctool.getClass(instance._sys_meta), {
				instance: instance,
				node: nodeInstance
			});
			//ラベル更新
			initLabel(addedNode, instance, ctool.getClass(instance._sys_meta));

			var result = modelController.macroOperation(macroOperation.onNodeAdded.name, editor_key, function (mc) {
				var addedInstance = null;
				var ninfo = dinfo.getNode(e.metaElement.id);
				var asso = ctool.getAssociation(ninfo.containFeature);
				if (ctool.getParentClass(ninfo.containFeature).id == diagram._sys_meta) {
					addedInstance = mc.addInstanceRaw(diagram, asso, e.metaElement, editor_key);
				} else if (ctool.getParentClass(ninfo.containFeature).id == pkg._sys_meta) {
					addedInstance = mc.addInstanceRaw(pkg, asso, e.metaElement, editor_key);
					//modelController.associate(diagram, addedInstance, editor_key);
				}

				var nodeClass = ctool.getClass("Editor.DiagramEditor.Node");
				var addedNodeInstance = mc.addInstanceRaw(diagram, metadiagram.associations._nodes, nodeClass, editor_key);
				mc.updateProperties(addedNodeInstance, { x: Math.floor(e.x),
					y: Math.floor(e.y),
					w: e.w,
					h: e.h,
					uri: modelController.getURI(addedInstance) }, editor_key);
				return {
					instanceURI: mc.getURI(addedInstance),
					nodeURI: mc.getURI(addedNodeInstance)
				};
			}, editor_key);
		},
		executeOperation: function executeOperation(op, sender) {
			this.executeOperationResult(op, sender);
		},
		/*
   * opResultはオペレーション結果です。他の場所でオペレーションが実行され、その結果をもとに処理をします。
   */
		executeOperationResult: function executeOperationResult(opResult, sender) {
			console.log("executeOperationResult", opResult.eventName);
			if (opResult.eventName === macroOperation.onNodeAdded.name) {
				this.addNodeByOther(modelController.get(opResult.eventObject.instanceURI), modelController.get(opResult.eventObject.nodeURI), opResult.eventObject.metaNode);
			} else if (opResult.eventName === macroOperation.onChildAdded.name) {
				this.addChildNodeByOther(modelController.get(opResult.eventObject.instanceURI), modelController.get(opResult.eventObject.nodeURI), modelController.get(opResult.eventObject.parentURI), opResult.eventObject.parentNodeURI, opResult.eventObject.parentMetaNode, opResult.eventObject.metaNode);
			} else if (opResult.eventName === macroOperation.onConnectionAdded.name) {
				this.addConnectionByOther(modelController.get(opResult.eventObject.instanceURI), modelController.get(opResult.eventObject.connectionURI), opResult.eventObject.startURI, opResult.eventObject.endURI, opResult.eventObject.metaConnection);
			} else if (opResult.eventName === macroOperation.onSelected.name) {} else if (opResult.eventName === macroOperation.onNodeMoved.name) {
				this.moveByOther(opResult.eventObject.nodeURI, modelController.get(opResult.eventObject.nodeURI));
			} else if (opResult.eventName === macroOperation.onNodeResized.name) {
				this.resizeByOther(opResult.eventObject.nodeURI, modelController.get(opResult.eventObject.nodeURI));
			} else if (opResult.eventName === macroOperation.onPointMoved.name) {
				this.movePointByOther(opResult.eventObject.nodeURI);
			} else if (opResult.eventName === macroOperation.onNodeRemovedFromModel.name) {
				var nodeURI = opResult.eventObject.nodeURI;
				editor.removeElement(nodeURI, false);
			} else if (opResult.eventName === macroOperation.onNodeRemovedFromDiagram.name) {
				var nodeURI = opResult.eventObject.nodeURI;
				editor.removeElement(nodeURI, false);
			} else if (opResult.eventName === macroOperation.onConnectionRemovedFromModel.name) {
				editor.removeElement(opResult.eventObject.connectionURI, false);
			} else if (opResult.eventName === macroOperation.onConnectionRemovedFromDiagram.name) {
				editor.removeElement(opResult.eventObject.connectionURI, false);
			}
		},
		executeOperationResultInverse: function executeOperationResultInverse(opResult, sender) {
			console.log("executeOperationResultInverse", opResult);

			if (opResult.eventName === macroOperation.onNodeAdded.name) {
				var nodeURI = opResult.eventObject.nodeURI;
				editor.removeElement(nodeURI, false);
			} else if (opResult.eventName === macroOperation.onChildAdded.name) {
				var nodeURI = opResult.eventObject.nodeURI;
				editor.removeElement(nodeURI, false);
			} else if (opResult.eventName === macroOperation.onConnectionAdded.name) {
				var connectionURI = opResult.eventObject.connectionURI;
				editor.removeElement(connectionURI, false);
			} else if (opResult.eventName === macroOperation.onSelected.name) {} else if (opResult.eventName === macroOperation.onNodeMoved.name) {
				this.moveByOther(opResult.eventObject.nodeURI, modelController.get(opResult.eventObject.nodeURI));
			} else if (opResult.eventName === macroOperation.onNodeResized.name) {
				this.resizeByOther(opResult.eventObject.nodeURI, modelController.get(opResult.eventObject.nodeURI));
			} else if (opResult.eventName === macroOperation.onPointMoved.name) {
				this.movePointByOther(opResult.eventObject.nodeURI);
			} else if (opResult.eventName === macroOperation.onNodeRemovedFromModel.name) {
				if (opResult.eventObject.parentURI) {
					this.addChildNodeByOther(modelController.get(opResult.eventObject.id), modelController.get(opResult.eventObject.nodeURI), modelController.get(opResult.eventObject.parentURI), opResult.eventObject.parentNodeURI, opResult.eventObject.parentMetaNode, opResult.eventObject.metaNode);
				} else {
					this.addNodeByOther(modelController.get(opResult.eventObject.id), modelController.get(opResult.eventObject.nodeURI), opResult.eventObject.metaNode);
				}
			} else if (opResult.eventName === macroOperation.onNodeRemovedFromDiagram.name) {} else if (opResult.eventName === macroOperation.onConnectionRemovedFromModel.name) {
				this.addConnectionByOther(modelController.get(opResult.eventObject.id), modelController.get(opResult.eventObject.connectionURI), opResult.eventObject.startURI, opResult.eventObject.endURI, opResult.eventObject.metaConnection);
			} else if (opResult.eventName === macroOperation.onConnectionRemovedFromDiagram.name) {}
		},
		getSVG: function getSVG() {
			return document.getElementById('editfield-' + editor_key).innerHTML;
		},
		highlight: function highlight(uri, col) {
			var node = editor.getElementByURI(uri);
			node.highlight(col);
		},
		highlightById: function highlightById(attr, id, col) {
			this.highlight(ModelController.getURI(diagram[attr][id]), col);
		}
	};
}

module.exports = GraphiticalModelEditor;

},{}],2:[function(require,module,exports){
'use strict';

var GraphiticalModelEditor = require('./gme2');

window.clooca = window.parent.window.clooca;

var mainDom = document.getElementById('main');

var gme = new GraphiticalModelEditor(mainDom);

clooca.registerPlugin('gme', gme);

},{"./gme2":1}]},{},[2]);
