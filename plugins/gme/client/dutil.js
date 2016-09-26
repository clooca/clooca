/**
 * client/editor/diagrameditor/diagrameditor.js
 * @author Shuhei Hiya
 */
(function(){
	
	function Util() {}
	
	Util.SelectedObject = function() {
		var selected_type = 'single';
		var selected_data = null;
		var selected_datas = [];
		var length = 0;
		return {
			select : function(node) {
				selected_data = node;
				selected_datas.push(node);
				length++;
				if(length >= 2) selected_type = 'multi';
			},
			clear : function() {
				selected_data = null;
				selected_datas = [];
				selected_type = 'single';
				length = 0;
			},
			getSelectedType : function() {
				return selected_type;
			},
			setSelectedType : function(t) {
				selected_type = t;
			},
			getSelectedData : function() {
				return selected_data;
			},
			getSelectedDatas : function() {
				return selected_datas;
			},
			isSelected : function() {
				return selected_data != null;
			}
		}
	}
	
	/**
	 * PointCursor
	 * コネクション用のカーソル
	 */
	Util.PointCursor = function(base) {
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
	Util.Resizer = function(base) {
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
	
	if(window.clooca){
		if(!window.clooca.hasOwnProperty("diagrameditor")){
			window.clooca.diagrameditor = function(){};
		}
	}else{
		window.clooca = function(){};
		window.clooca.diagrameditor = function(){};
	}
	window.clooca.diagrameditor.Util = Util;

}());