/**
 * @author Shuhei Hiya
 */
	
/**
 * @param _key
 * @param _name
 * @param _diagram
 * @param _dinfo
 * @param _modelController
 */
function DiagramEditor(_key, _svg, _editfield, _instance, _container, _metaDiagramInfo, _editordef, _modelController, _ctool, _editorTabPanel) {
	var self = this;
	var instance = _instance;
	var container = _container;
	var editordef = _editordef;
	var modelController = _modelController;
	var ctool = _ctool;
	var metadiagram = _ctool.getClass(_instance._sys_meta);
	var diagramEditor = null;
	var editorTabPanel = _editorTabPanel;
	var options = {connection_style : "bezier"};
	var listeners = {
			onInit : [],
			onMouseOver : [],
			onSelected : [],
			onDblClick : [],
			onResized : [],
			onMovePoint : [],
			onMoved : [],
			onNodeAdded : [],
			onChildAdded : [],
			onConnectionAdded : [],
			onDeleted : [],
			onUpdated : []
	};
	var key = _key;
	var width = 500;
	var height = 500;
	var toolpallet = null;
	var selectedTool = null;
	var svg = _svg;
	var base = null;
	//ダイアグラム要素
	var diagramElements = {};
	var dragStartItem = null;
	var dragEndItem = null;
	
	
	var movebox = document.createElementNS(SVG,'rect');
	movebox.setAttribute("stroke", "gray");
	movebox.setAttribute("stroke-width", 2);
	movebox.setAttribute("stroke-dasharray", 2);
	movebox.setAttribute("fill", "none");
	movebox.setAttribute("visibility", "hidden");
	movebox.setAttribute("pointer-events", "none");
	
	var rubberband = document.createElementNS(SVG,'line');
	rubberband.setAttribute("stroke", "black");
	rubberband.setAttribute("pointer-events", "none");
	var moveRubberband = function(ex, ey) {
		rubberband.setAttribute("x2", ex);
		rubberband.setAttribute("y2", ey);
	};
	
	/**
	 * コネクション用のカーソル
	 */
	var pointeditor = null;
	function PointEditor(base) {
		var orig = null;
		var target = null;
		var startX = 0;
		var startY = 0;
		var startWidth = 0;
		var startHeight = 0;
		var rectPoints = [null,null,null,null,null];
		var selectedPoint = null;
		for(var i=0;i < 5;i++) {
			rectPoints[i] = createRect(i < 2 ? "#cccccc" : "#7777cc");
			base.appendChild(rectPoints[i]);
		}
		function createRect(color) {
			var r = document.createElementNS(SVG,'rect');
			r.style.stroke = "#505077";
			r.style.fill = color;
			r.setAttribute('x', 0);
			r.setAttribute('y', 0);
			r.setAttribute('rx', 2);
			r.setAttribute('ry', 2);
			r.setAttribute('width', 8);
			r.setAttribute('height', 8);
			return r;
		}
		function mouseDown(resizerKey, e) {
		    var ctm = rectPoints[resizerKey].getCTM();
		    var _origPoint = svg.createSVGPoint();
		    _origPoint.x = e.pageX;
		    _origPoint.y = e.pageY;
		    var origPoint = _origPoint.matrixTransform(ctm.inverse());
		    
		    orig = {
					x : Number(rectPoints[resizerKey].getAttribute("x")),
					y : Number(rectPoints[resizerKey].getAttribute("y")),
					pageX : origPoint.x,
					pageY : origPoint.y
		    };
			diagramEditor.dragMode = DiagramEditor.DRAG_POINT;
			selectedPoint = resizerKey;
		}
		rectPoints[0].addEventListener("mousedown", function (e) {
			mouseDown(0, e);
		});
		rectPoints[1].addEventListener("mousedown", function (e) {
			mouseDown(1, e);
		});
		rectPoints[2].addEventListener("mousedown", function (e) {
			mouseDown(2, e);
		});
		rectPoints[3].addEventListener("mousedown", function (e) {
			mouseDown(3, e);
		});
		rectPoints[4].addEventListener("mousedown", function (e) {
			mouseDown(4, e);
		});
		svg.addEventListener("mousemove", function (e) {
			if(orig==null) return;
			if(diagramEditor.dragMode == DiagramEditor.DRAG_POINT) {
		    	var ctm = rectPoints[selectedPoint].getCTM();
	        	var point = svg.createSVGPoint();
	        	point.x = e.pageX;
	        	point.y = e.pageY;
	        	point = point.matrixTransform(ctm.inverse());
	        	var xx = (point.x - orig.pageX);
	        	var yy = (point.y - orig.pageY);
	        	var x = orig.x + xx;
	        	var y = orig.y + yy;
	        	rectPoints[selectedPoint].setAttribute('x', x);
	        	rectPoints[selectedPoint].setAttribute('y', y);
	        	if(selectedPoint - 2 >= 0) {
					startX = target.getStartPoint().x;
					startY = target.getStartPoint().y;
		        	target.movePoint(selectedPoint - 2, x-startX, y-startY);
	        	}
			}
		});
		rectPoints[0].addEventListener("mouseover", function (e) {
			rectPoints[0].style.cursor = "all-scroll";
		}, false);
		rectPoints[1].addEventListener("mouseover", function (e) {
			rectPoints[1].style.cursor = "all-scroll";
		}, false);
		rectPoints[2].addEventListener("mouseover", function (e) {
			rectPoints[2].style.cursor = "all-scroll";
		}, false);
		rectPoints[3].addEventListener("mouseover", function (e) {
			rectPoints[3].style.cursor = "all-scroll";
		}, false);
		rectPoints[4].addEventListener("mouseover", function (e) {
			rectPoints[4].style.cursor = "all-scroll";
		}, false);
		function refresh() {
			var points = target.getPoint();
			for(var i=0;i < points.length;i++) {
				rectPoints[i+2].setAttribute('x', target.getStartPoint().x + points[i].x - 4);
				rectPoints[i+2].setAttribute('y', target.getStartPoint().y + points[i].y - 4);
				rectPoints[i+2].setAttribute('visibility', 'visible');
			}
			rectPoints[1].setAttribute('x', target.getEndPoint().x - 4);
			rectPoints[1].setAttribute('y', target.getEndPoint().y - 4);
			rectPoints[1].setAttribute('visibility', 'visible');
		}
		_clear();
		function _clear() {
			for(var i=0;i < 5;i++) {
				rectPoints[i].setAttribute('x', 0);
				rectPoints[i].setAttribute('y', 0);
				rectPoints[i].setAttribute('visibility', 'hidden');
			}
		}
		return {
			setConnection : function(connection) {
				target = connection;
				startX = target.getStartPoint().x;
				startY = target.getStartPoint().y;
				_clear();
				refresh();
			},
			clear : _clear,
			getIndex : function() {
				return selectedPoint - 2;
			}
		}
	}
	/**
	 * サイズ変更用のカーソル
	 */
	var resizer = null;
	function Resizer(base) {
		var listeners = {
				onResize : [],
				onMove : []
		};
		var fireOnResize = function(e) {
			for(var i=0;i < listeners.onResize.length;i++) {
				listeners.onResize[i](e);
			}
		}
		var fireOnMove = function(e) {
			for(var i=0;i < listeners.onMove.length;i++) {
				listeners.onMove[i](e);
			}
		}
		var orig = null;
		var target = null;
		var startX = 0;
		var startY = 0;
		var startWidth = 0;
		var startHeight = 0;
		var arrow = null;
		var resizer = {
				n:null,s:null,e:null,w:null,ne:null,nw:null,se:null,sw:null
		}
		var selectedResizer = null;
		for(var key in resizer) {
			resizer[key] = document.createElementNS(SVG,'rect');
			base.appendChild(resizer[key]);
			resizer[key].style.stroke = "#505077";
			resizer[key].style.fill = "#7777cc";
			resizer[key].setAttribute('x', 0);
			resizer[key].setAttribute('y', 0);
			resizer[key].setAttribute('width', 8);
			resizer[key].setAttribute('height', 8);
			resizer[key].addEventListener("mouseup", function (e) {
				orig = null;
				//target = null;
			});
			resizer[key].addEventListener("mouseout", function (e) {
				resizer[key].style.cursor = "default";
			}, false);
		}
		arrow = document.createElementNS(SVG,'circle');
		base.appendChild(arrow);
		arrow.style.stroke = "#775050";
		arrow.style.fill = "#cc7070";
		arrow.setAttribute('cx', 0);
		arrow.setAttribute('cy', 0);
		arrow.setAttribute('r', 5);
		arrow.addEventListener("mouseup", function (e) {
			orig = null;
			//target = null;
		});
		arrow.addEventListener("mouseout", function (e) {
			arrow.style.cursor = "default";
		}, false);
		arrow.addEventListener("mousedown", function (e) {
		    var ctm = arrow.getCTM();
		    var _origPoint = svg.createSVGPoint();
		    _origPoint.x = e.pageX;
		    _origPoint.y = e.pageY;
		    var origPoint = _origPoint.matrixTransform(ctm.inverse());
		    
		    orig = {
					x : Number(arrow.getAttribute("cx")),
					y : Number(arrow.getAttribute("cy")),
					pageX : origPoint.x,
					pageY : origPoint.y
		    };
		    for(var i=0;i < _metaDiagramInfo.toolpallet.length;i++) {
				var coninfo = _metaDiagramInfo.getConnectionById(_metaDiagramInfo.toolpallet[i].target);
				if(coninfo) {
					selectedTool = _metaDiagramInfo.toolpallet[i];
				}
		    }
			diagramEditor.startRubberband(target);
			diagramEditor.dragMode = DiagramEditor.DRAG_RUBBERBAND;
		});
		
		function mouseDown(resizerKey, e) {
		    var ctm = resizer[resizerKey].getCTM();
		    var _origPoint = svg.createSVGPoint();
		    _origPoint.x = e.pageX;
		    _origPoint.y = e.pageY;
		    var origPoint = _origPoint.matrixTransform(ctm.inverse());
		    
		    orig = {
					x : Number(resizer[resizerKey].getAttribute("x")),
					y : Number(resizer[resizerKey].getAttribute("y")),
					pageX : origPoint.x,
					pageY : origPoint.y
		    };
			diagramEditor.dragMode = DiagramEditor.DRAG_RESIZE;
			selectedResizer = resizerKey;
		}
		resizer.n.addEventListener("mousedown", function (e) {
			mouseDown("n", e);
		});
		resizer.s.addEventListener("mousedown", function (e) {
			mouseDown("s", e);
		});
		resizer.w.addEventListener("mousedown", function (e) {
			mouseDown("w", e);
		});
		resizer.e.addEventListener("mousedown", function (e) {
			mouseDown("e", e);
		});
		resizer.ne.addEventListener("mousedown", function (e) {
			mouseDown("ne", e);
		});
		resizer.nw.addEventListener("mousedown", function (e) {
			mouseDown("nw", e);
		});
		resizer.se.addEventListener("mousedown", function (e) {
			mouseDown("se", e);
		});
		resizer.sw.addEventListener("mousedown", function (e) {
			mouseDown("sw", e);
		});
		svg.addEventListener("mousemove", function (e) {
			if(orig==null) return;
			if(diagramEditor.dragMode == DiagramEditor.DRAG_RESIZE) {
		    	var ctm = resizer[selectedResizer].getCTM();
	        	var point = svg.createSVGPoint();
	        	point.x = e.pageX;
	        	point.y = e.pageY;
	        	point = point.matrixTransform(ctm.inverse());
	        	var xx = (point.x - orig.pageX);
	        	var yy = (point.y - orig.pageY);
	        	if(selectedResizer == "n" || selectedResizer == "s") xx = 0;
	        	if(selectedResizer == "e" || selectedResizer == "w") yy = 0;
	        	var x = orig.x + xx;
	        	var y = orig.y + yy;
				resizer[selectedResizer].setAttribute('x', x);
				resizer[selectedResizer].setAttribute('y', y);
				refresh();
				var resultX=startX, resultY=startY, resultW=startWidth, resultH=startHeight;
				if(selectedResizer == "n" || selectedResizer == "ne" || selectedResizer == "nw") {
					resultY = yy + startY;
					resultH = -yy + startHeight;
				}
				if(selectedResizer == "w" || selectedResizer == "nw" || selectedResizer == "sw") {
					resultX = xx + startX;
					resultW = -xx + startWidth
				}
				if(selectedResizer == "s" || selectedResizer == "se" || selectedResizer == "sw") {
					resultH = yy + startHeight;
				}
				if(selectedResizer == "ne" || selectedResizer == "e" || selectedResizer == "se") {
					resultW = xx + startWidth
				}
				if(selectedResizer == "s" || selectedResizer == "se" || selectedResizer == "e") {
					
				}else{
					fireOnMove({
						x : resultX,
						y : resultY
					});
				}
				fireOnResize({
					width : resultW,
					height : resultH
				});
			}
		});
		resizer.n.addEventListener("mouseover", function (e) {
			resizer.n.style.cursor = "n-resize";
		}, false);
		resizer.s.addEventListener("mouseover", function (e) {
			resizer.s.style.cursor = "s-resize";
		}, false);
		resizer.w.addEventListener("mouseover", function (e) {
			resizer.w.style.cursor = "w-resize";
		}, false);
		resizer.e.addEventListener("mouseover", function (e) {
			resizer.e.style.cursor = "e-resize";
		}, false);
		resizer.ne.addEventListener("mouseover", function (e) {
			resizer.ne.style.cursor = "ne-resize";
		}, false);
		resizer.nw.addEventListener("mouseover", function (e) {
			resizer.nw.style.cursor = "nw-resize";
		}, false);
		resizer.se.addEventListener("mouseover", function (e) {
			resizer.se.style.cursor = "se-resize";
		}, false);
		resizer.sw.addEventListener("mouseover", function (e) {
			resizer.sw.style.cursor = "sw-resize";
		}, false);
		arrow.addEventListener("mouseover", function (e) {
			arrow.style.cursor = "e-resize";
		}, false);
		var refresh = function() {
			resizer.n.setAttribute('x', target.getX() + target.getW() / 2 - 4);
			resizer.n.setAttribute('y', target.getY()-14);
			
			resizer.s.setAttribute('x', target.getX() + target.getW() / 2);
			resizer.s.setAttribute('y', target.getBottom()+6);
			
			resizer.w.setAttribute('x', target.getX() - 14);
			resizer.w.setAttribute('y', target.getY() + target.getH()/2 - 4);
			
			resizer.e.setAttribute('x', target.getRight()+6);
			resizer.e.setAttribute('y', target.getY() + target.getH()/2 - 4);
			
			resizer.ne.setAttribute('x', target.getRight()+6);
			resizer.ne.setAttribute('y', target.getY()-14);
			
			resizer.nw.setAttribute('x', target.getX() - 14);
			resizer.nw.setAttribute('y', target.getY()-14);
			
			resizer.se.setAttribute('x', target.getRight()+6);
			resizer.se.setAttribute('y', target.getBottom()+6);
			
			resizer.sw.setAttribute('x', target.getX() - 14);
			resizer.sw.setAttribute('y', target.getBottom()+6);
			
			arrow.setAttribute('cx', target.getRight() + 23);
			arrow.setAttribute('cy', target.getY() + target.getH()/2);
		}
		_clearSelectedNode();
		function _clearSelectedNode() {
			orig = null;
			target = null;
			for(var key in resizer) {
				resizer[key].setAttribute('x', 0);
				resizer[key].setAttribute('y', 0);
				resizer[key].setAttribute('visibility', 'hidden');
			}
			arrow.setAttribute('cx', 0);
			arrow.setAttribute('cy', 0);
			arrow.setAttribute('visibility', 'hidden');
		}
		return {
			setNode : function(node) {
				resizer.n.setAttribute('visibility', 'visible');
				resizer.s.setAttribute('visibility', 'visible');
				resizer.w.setAttribute('visibility', 'visible');
				resizer.e.setAttribute('visibility', 'visible');
				resizer.ne.setAttribute('visibility', 'visible');
				resizer.nw.setAttribute('visibility', 'visible');
				resizer.se.setAttribute('visibility', 'visible');
				resizer.sw.setAttribute('visibility', 'visible');
				arrow.setAttribute('visibility', 'visible');
				target = node;
				refresh();
				startX = node.getX();
				startY = node.getY();
				startWidth = node.getW();
				startHeight = node.getH();
			},
			on : function(event, l) {
				listeners[event].push(l);
			},
			clearSelectedNode : _clearSelectedNode
		}
	}
	
	var fireOnInit = function() {
		for(var i=0;i < listeners.onInit.length;i++) {
			listeners.onInit[i]();
		}
	};
	var fireOnMouseOver = function() {
		for(var i=0;i < listeners.onMouseOver.length;i++) {
			listeners.onMouseOver[i]();
		}
	};
	var fireOnResized = function(e) {
		for(var i=0;i < listeners.onResized.length;i++) {
			listeners.onResized[i](e);
		}
	};
	var fireOnMovePoint = function(e) {
		for(var i=0;i < listeners.onMovePoint.length;i++) {
			listeners.onMovePoint[i](e);
		}
	};
	var fireOnSelected = function(e) {
		console.log("onSelected",e);
		for(var i=0;i < listeners.onSelected.length;i++) {
			listeners.onSelected[i](e);
		}
	};
	var fireOnDeselected = function(e) {
		console.log("onDeselected",e);
	};
	var fireOnUpdated = function() {
		for(var i=0;i < listeners.onUpdated.length;i++) {
			listeners.onUpdated[i]();
		}
	};
	var fireOnMoved = function(e) {
		for(var i=0;i < listeners.onMoved.length;i++) {
			listeners.onMoved[i](e);
		}
	};
	var fireOnNodeAdded = function(e) {
		console.log("onNodeAdded",e);
		return listeners.onNodeAdded(e);
	};
	var fireOnChildAdded = function(e) {
		console.log("onChildAdded");
		return listeners.onChildAdded(e);
	};
	var fireOnConnectionAdded = function(e) {
		console.log("onConnectionAdded",e);
		return listeners.onConnectionAdded(e);
	};
	
	var broadcastSelect = function(e){
		//console.log("ee",e);
		if(e.getMeta()==="Node" || e.getMeta()==="Connection"){
			//console.log("bcast.select",e);
			/*
			var result = modelController.macroOperation(
					"onSelected",
					key,
					function(mc){
						return {
							id:e.id
						}
					},
					key);
			*/
		}
	};
	
	var broadcastDeselect = function(e){
		if(e.getMetaElement().gtype==="node" || e.getMetaElement().gtype==="connection"){
			//console.log("bcast.deselect",e);
			socket.send({event:"onDeselected",editor:key,id:e.getID()});	
		}
	};
	
	var broadcastNodeMove = function(x,y,node){
		//console.log("bcast.node.move",node);
		socket.send({event:"onNodeMove",editor:key,x:x,y:y,id:node.getID()});		
	};
	
	function _getElementByURI(uri) {
		for(var key in diagramElements) {
			if(diagramElements[key].getID() == uri) {
				return diagramElements[key];
			}
		}
		return null;
	}
	//real-time end
	function onUpdate_modelcontroller(e){
		var _id = modelController.getURI(e.instance);
		var propid = e.propertyName;
		if(e.propertyID) {
			propid = e.propertyID;
		}
		var delem = _getElementByURI(_id);
		var value = e.value;
		if(!delem) {
			//console.log("AAA", e);
			var parent = modelController.getParent(e.instance);
			_id = modelController.getURI(parent);
			propid = e.instance._sys_name;
			value = e.instance;
			//if(e.instance._sys_id != e.propertyName) return;
		}
		delem = _getElementByURI(_id);
		if(delem) {
			console.log("updateLabel", propid, value);
			delem.updateLabel(propid, value);
		}
	}
	function onAssociate_modelcontroller(e) {
		for(var key in diagramElements) {
			diagramElements[key].eachPanel(function(panel) {
				panel.eachLabel(function(label) {
					if(label.isCustom()) {
						label.refreshContent();
					}
				});
			});
		}
		return null;
	}
	function onRemove_modelcontroller(e){
		if(e.instance._sys_meta == "Editor.DiagramEditor.Node" || e.instance._sys_meta == "Editor.DiagramEditor.Connection") {
			var _id = modelController.getURI(e.instance);
			if(diagramElements[_id]) {
				diagramElements[_id].destroy();
				delete diagramElements[_id];
			}
		}else{
			var elem = _getElementByURI(modelController.getURI(e.instance));
			if(elem) {
				//これのノード情報を消す
	        	modelController.removeInstance(elem.getNodeURI(), key);
	        	elem.destroy();
				delete diagramElements[elem.getNodeURI()];
			}else{
				var parent = modelController.getContainer(e.instance);
				if(parent) {
					var parentElem = _getElementByURI(modelController.getURI(parent));
					if(parentElem) {
						parentElem.removeLabel(e.attrName, e.sysname);
					}
				}
			}
		}
		if(_id == modelController.getURI(instance)) {
			editorTabPanel.close(key);
		}
	}
	function onAddProperty_modelcontroller(e){
		var delem = _getElementByURI(modelController.getURI(e.instance));
		if(delem) {
			if(e.addedInstance._sys_meta) {
				//addedInstanceがクラスのとき
				delem.addLabel(e.propertyName,
						e.addedInstance._sys_name,
						e.addedInstance[e.addedInstance._sys_id]);
			}else{
				//addedInstanceがプリミティブのとき
				delem.addLabel(e.propertyName,
						e.addedPropertyID,
						e.addedInstance);
			}
		}
	}
	modelController.on('update', onUpdate_modelcontroller, key);
	modelController.on('associate', onAssociate_modelcontroller, key);
	modelController.on('addproperty', onAddProperty_modelcontroller, key);
	modelController.on('remove', onRemove_modelcontroller, key);
	return {
		getOption : function(key) {
			return options[key];
		},
		getCompiledTool : function() {
			return ctool;
		},
		getModelController : function() {
			return modelController;
		},
		editfield : _editfield,
		dragMode :  DiagramEditor.DRAG_NONE,
		metaDiagramInfo : _metaDiagramInfo,
		currentTextArea : null,
		selectedObject : clooca.diagrameditor.Util.SelectedObject(),
		//elem:ノードかコネクション
		//flg:イベント発火フラグ
		removeElement : function(id, flg) {
			if(flg) modelController.removeInstance(id, key);
			diagramElements[id].destroy();
			delete diagramElements[id];
		},
		getElementByURI : _getElementByURI,
		fireOnDblClick : function(e) {
			for(var i=0;i < listeners.onDblClick.length;i++) {
				listeners.onDblClick[i](e);
			}
		},
		Select : function(elem,other) {
			if(elem.getMeta()==="Node") {
				resizer.setNode(elem);
				pointeditor.clear();
			}
			if(elem.getMeta()==="Connection") {
				pointeditor.setConnection(elem);
				resizer.clearSelectedNode();
			}
			fireOnSelected({
				target:elem
			});
			if(!other){
				broadcastSelect(elem);
			}
		},
		Deselect : function(elem,other) {
			//fireOnDeselected(elem);
			if(!other){
				//broadcastDeselect(elem);
			}
		},

		getSelectedObject : function() {
			return this.selectedObject;
		},
		getElement : function(id) {
			if(diagramElements[id]) return diagramElements[id];
			return null;
		},
		forceMoveX : function(nodeInstanceURI, x) {
			for(var i=0;i < elements.length;i++) {
				if(elements[i].getNodeURI() == nodeInstanceURI) {
					elements[i].moveX(x);
				}
			}
		},
		forceMoveY : function(nodeInstanceURI, y) {
			for(var i=0;i < elements.length;i++) {
				if(elements[i].getNodeURI() == nodeInstanceURI) {
					elements[i].moveY(y);
				}
			}
		},
		Move : function(x, y, node, other) {
			resizer.setNode(node);
			fireOnMoved({
				x : x,
				y : y,
				target : node});
				
			if(other==undefined){
				//broadcastNodeMove(x,y,node);
			}
				
		},
		setAddNodeListenner : function(l) {
			listeners["onNodeAdded"] = l;
		},
		setAddChildListenner : function(l) {
			listeners["onChildAdded"] = l;
		},
		setAddConnectionListenner : function(l) {
			listeners["onConnectionAdded"] = l;
		},
		on : function(event, l){
			listeners[event].push(l);
		},
		setTool : function(tool) {
			console.log("setTool", tool);
			selectedTool = tool;
		},
		/*
		 * x,y,w,h 初期座標等
		 * metaNode メタノード要素
		 * data    要素に適当な型のデータを持たしておくことができる
		 */
		addNode : function(x, y, w, h, metaNode, data,_id) {
			//check
			var metaEle = ctool.getClass(metaNode.metaElement);
			
			var instanceData = null;
			
			if(data == undefined) {
				//モデル要素を新規作成
				instanceData = fireOnNodeAdded({metaElement : metaEle, metaNode : metaNode, x: x, y: y, w: w, h: h,_id:_id});
			}else{
				//既にモデル要素は存在するので、それを設定する
				instanceData = data;
			}
			if(instanceData == null) return null;
			var node = new clooca.diagrameditor.Node(this,
					metaNode,
					instanceData,
					base,
					{x:x, y:y, w:w, h:h});
			diagramElements[node.getNodeURI()] = node;
			//elements.push(node);
			return node;
		},
		addChildNode : function(x, y, w, h, parentNode, metaNode, data) {
			var instanceData = null;
			
			var metaEle = ctool.getClass(metaNode.metaElement);
			var parentMetaNode = parentNode.getMetaNode();
			if(data == undefined) {
				instanceData = fireOnChildAdded({metaElement : metaEle, metaNode : metaNode, parent:parentNode, parentMetaNode : parentMetaNode, x: x, y: y, w: w, h: h});
			}else{
				instanceData = data;
			}
			if(instanceData == null) return null;
			console.log("子ノードが追加されました。", metaNode);
			var node = new clooca.diagrameditor.Node(this,
					metaNode,
					instanceData,
					parentNode.getChildrenGroup(),
					{x:x, y:y, w:w, h:h},
					parentNode);
			parentNode.addChild(node);
			diagramElements[node.getNodeURI()] = node;
			//elements.push(node);
			
			return node;
		},
		addConnection : function(start, end, metaConnection, data,_id) {
			var instanceData = null;
			
			var metaEle = ctool.getClass(metaConnection.metaElement);

			if(_id !==undefined){
				metaEle=ctool.getClass(metaEle);
			}
			
			if(data == undefined) {
				instanceData = fireOnConnectionAdded({metaElement : metaEle, metaConnection : metaConnection, start : start, end : end,_id:_id});
			}else{
				instanceData = data;
			}
			if(instanceData == null) return null;
			var connection = new clooca.diagrameditor.Connection(this, metaConnection, instanceData);
			connection.create(start, end);
			diagramElements[connection.getNodeURI()] = connection;
			if(start == end) {
				connection.addPoint();
				connection.addPoint();
				connection.movePoint(0,-10,-20);
				connection.movePoint(1,-20,-10);
			}
			return connection;
		},
		updateProperty : function(uri, pname, value) {
			modelController.updateProperty(
					modelController.get(uri),
					pname,
					null,
					value,
					key);
		},
		startRubberband : function(i) {
			dragStartItem = i;
			rubberband.removeAttribute('visibility');
			rubberband.setAttribute("x1", i.getX() + i.getW() / 2);
			rubberband.setAttribute("y1", i.getY() + i.getH() / 2);
			rubberband.setAttribute("x2", i.getX());
			rubberband.setAttribute("y2", i.getY());
		},
		endRubberband : function() {
			rubberband.setAttribute("visibility", "hidden");
			return dragStartItem;
		},
		getSVG : function() {
			return svg;
		},
		getBase : function() {
			return base;
		},
		getGraphic : function(id) {
			return editordef.getGraphic(id);
		},
		getConnectionGraphic : function(id) {
			return editordef.getConnectionGraphic(id);
		},
		getSelectedTool : function() {
			if(selectedTool) {
				var nodeinfo = this.metaDiagramInfo.getNodeById(selectedTool.target);
				if(nodeinfo) {
					return nodeinfo
				}else{
					var coninfo = this.metaDiagramInfo.getConnectionById(selectedTool.target);
					if(coninfo) {
						return coninfo
					}
				}
				return null;
			}else{
				return null;
			}
		},
		getSelectedToolType : function() {
			if(selectedTool) {
				return selectedTool.type;
			}else{
				return null;
			}
		},
		onClose : function() {
			modelController.off('update', onUpdate_modelcontroller, key);
			modelController.off('addproperty', onAddProperty_modelcontroller, key);
			modelController.off('remove', onRemove_modelcontroller, key);
		},
		Initialize : function() {
			var self = this;
			diagramEditor = self;
			//svg = document.getElementById('diagram-'+key);
			base = document.createElementNS(SVG, 'g');
			base1 = document.createElementNS(SVG, 'g');
			svg.appendChild(base);
			svg.appendChild(base1);
			resizer = new Resizer(base1);
			resizer.on("onResize",function(e){
				self.selectedObject.getSelectedData().setSize(
						e.width,
						e.height
				);
			});
			resizer.on("onMove",function(e){
		    	self.selectedObject.getSelectedData().movePosition(e.x, e.y);
			});
			pointeditor = new PointEditor(base1);
			base1.appendChild(movebox);
			base1.appendChild(rubberband);
			fireOnInit();
			for(var key in diagramElements) {
				if(diagramElements[key].getMeta() == "Connection") {
					diagramElements[key].refresh();
				}
			}
			svg.addEventListener("dblclick", function (e) {
			}, false);
			svg.addEventListener("mousedown", function (e) {
				var rect = svg.getBoundingClientRect();
				var mouseX = e.clientX - rect.left;
				var mouseY = e.clientY - rect.top;
				if(e.target.nodeName == "svg") {
					if(selectedTool) {
						var eleminfo = self.getSelectedTool();
						console.log(eleminfo);
						if(eleminfo instanceof clooca.diagrameditor.EditorDef.Node) {
							console.log("11");
							//self.addNode(mouseX, mouseY, null, null, ctool.getClass(eleminfo.metaElement));
							self.addNode(mouseX, mouseY, null, null, eleminfo);
						}
					}else{
						self.selectedObject.clear();
						resizer.clearSelectedNode();
					}
				}
				for(var key in diagramElements) {
					if(self.selectedObject.getSelectedData() != diagramElements[key]) diagramElements[key].deselect();
				}
				if(self.currentTextArea) {
					self.editfield.removeChild(self.currentTextArea);
					self.currentTextArea = null;
				}
			}, false);
			function m0ve_qct10n(e) {
				if(self.dragMode == DiagramEditor.DRAG_NONE) {
					
				}else if(self.dragMode == DiagramEditor.DRAG_MOVE) {
				    if (self.selectedObject.isSelected() && self.selectedObject.getSelectedData().getMeta() == "Node" && self.selectedObject.getSelectedData().getOrig() !== null) {
				    	var node = self.selectedObject.getSelectedData();
				    	var ctm = node.getRect().getCTM();
				        	var point = svg.createSVGPoint();
				        	point.x = e.pageX;
				        	point.y = e.pageY;
				        	point = point.matrixTransform(ctm.inverse());
				    	
				    	var x = node.getOrig().x + (point.x - node.getOrig().pageX);
				    	var y = node.getOrig().y + (point.y - node.getOrig().pageY);
						//start of 移動カーソル
						movebox.setAttribute("x", x + (node.getParent()==null ? 0 : node.getParent().getX()));
						movebox.setAttribute("y", y + (node.getParent()==null ? 0 : node.getParent().getY()));
						movebox.setAttribute("width", node.getW());
						movebox.setAttribute("height", node.getH());
						movebox.setAttribute("visibility", "visible");
						//end of 移動カーソル
				    }
				}else if(self.dragMode == DiagramEditor.DRAG_RESIZE) {
					
				}else if(self.dragMode == DiagramEditor.DRAG_RUBBERBAND) {
					var rect = svg.getBoundingClientRect();
					var mouseX = e.clientX - rect.left;
					var mouseY = e.clientY - rect.top;
					moveRubberband(mouseX, mouseY);
				}
			}
			svg.addEventListener("mousemove", m0ve_qct10n, false);
			svg.addEventListener("mouseup", function (e) {
				console.log(self.dragMode);
				if(self.dragMode == DiagramEditor.DRAG_RUBBERBAND) {
					self.endRubberband();
				}else if(self.dragMode == DiagramEditor.DRAG_MOVE) {
				    if (self.selectedObject.isSelected() && self.selectedObject.getSelectedData().getMeta() == "Node" && self.selectedObject.getSelectedData().getOrig() !== null) {
				    	var ctm = self.selectedObject.getSelectedData().getRect().getCTM();
				        	var point = svg.createSVGPoint();
				        	point.x = e.pageX;
				        	point.y = e.pageY;
				        	point = point.matrixTransform(ctm.inverse());
				    	
				    	var x = self.selectedObject.getSelectedData().getOrig().x + (point.x - self.selectedObject.getSelectedData().getOrig().pageX);
				    	var y = self.selectedObject.getSelectedData().getOrig().y + (point.y - self.selectedObject.getSelectedData().getOrig().pageY);
			    		console.log("AAAAA");
				    	if(self.selectedObject.getSelectedData().movePosition(x, y)) {
				    		console.log("BBBBB");
							self.Move(Number(self.selectedObject.getSelectedData().getX()),
									Number(self.selectedObject.getSelectedData().getY()),
									self.selectedObject.getSelectedData());
				    	}
				    }
					//start of 移動カーソル
					movebox.setAttribute("visibility", "hidden");
					//end of 移動カーソル
				}else if(self.dragMode == DiagramEditor.DRAG_RESIZE) {
					fireOnResized({
						target : diagramEditor.selectedObject.getSelectedData(),
						w : diagramEditor.selectedObject.getSelectedData().getW(),
						h : diagramEditor.selectedObject.getSelectedData().getH()
					});
				}else if(self.dragMode == DiagramEditor.DRAG_POINT) {
					if(pointeditor.getIndex() >= 0) {
						//console.log("point_editor_mouse_up");
						if(diagramEditor.selectedObject.getSelectedData()) {
							fireOnMovePoint({
								target : diagramEditor.selectedObject.getSelectedData(),
								index : pointeditor.getIndex(),
								x : diagramEditor.selectedObject.getSelectedData().getPoint()[pointeditor.getIndex()].x,
								y : diagramEditor.selectedObject.getSelectedData().getPoint()[pointeditor.getIndex()].y
							});
						}
					}
					pointeditor.clear();
				}
				self.dragMode = DiagramEditor.DRAG_NONE;
			}, false);
		}
	}
}

DiagramEditor.DRAG_NONE = 0;
DiagramEditor.DRAG_RUBBERBAND = 1;
DiagramEditor.DRAG_MOVE = 2;
DiagramEditor.DRAG_POINT = 3;
DiagramEditor.DRAG_RANGE = 4;
DiagramEditor.DRAG_RESIZE = 5;

module.exports = DiagramEditor;