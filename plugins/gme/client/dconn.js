/**
 * client/editor/diagrameditor/dcon.js
 * Copyright (C) 2013 Technical Rockstars Co.,Ltd. All Rights Reserved.
 * @author Shuhei Hiya
 */
(function(){
	
	function Connection(_diagramEditor, _metaConnection, _data) {
		var diagramEditor = _diagramEditor;
		var metaConnection = _metaConnection;
		var metaEle = diagramEditor.getCompiledTool().getClass(metaConnection.metaElement);
		var graphicConfig = null;
		var asso_group = null;
		var panel_group = null;
		var col_path = null;
		var path = null;
		var startElement = null;
		var endElement = null;
		var properties = {};
		//パネル
		var propertyPanels = {};
		//ラベル
		var labels = {};
		var instanceData = _data;
		var startPoint = new Point2D();
		var endPoint = new Point2D();
		var points = {};
		return {
			getMeta : function() {
				return "Connection";
			},
			getDiagramEditor : function() {
				return diagramEditor;
			},
			getModelElement : function() {
				return instanceData.instance;
			},
			getID : function() {
				return instanceData.instance._sys_parent_uri + "." + instanceData.instance._sys_name;
			},
			getNodeURI : function() {
				return instanceData.connection._sys_parent_uri + "." + instanceData.connection._sys_name;
			},
			getStart : function() {
				return startElement;
			},
			getEnd : function() {
				return endElement;
			},
			getStartPoint : function() {
				return startPoint;
			},
			getEndPoint : function() {
				return endPoint;
			},
			getMetaElement : function() {
				return metaEle;
			},
			getProperty : function(propertyName) {
				return properties[propertyName];
			},
			updateLabel : function(propertyName, content) {
				var label = findLabel(propertyName);
				if(label) label.setValue(content);
				//this.refreshPanels();
				return;
				function findLabel(prop_id) {
					console.log(propertyPanels, prop_id);
					if(labels.hasOwnProperty(prop_id)) {
						return labels[prop_id];
					}
					for(var key in propertyPanels) {
						var l = propertyPanels[key].findLabel(prop_id);
						if(l) return l;
					}
					return null;
				}
			},
			getPoint : function() {
				var result = [];
				for(var key in points) {
					result.push(new Point2D(points[key].x, points[key].y));
				}
				return result;
			},
			movePoint : function(index, x, y) {
				points[index].x = x;
				points[index].y = y;
				this.refresh();
			},
			setPoint : function(_points) {
				points = [];
				for(var i=0;i < _points.length;i++) {
					points.push({
						x: _points[i].x,
						y: _points[i].y
					});
				}
			},
			addPoint : function() {
				var px = (startPoint.x + endPoint.x) / 2 - startPoint.x;
				var py = (startPoint.y + endPoint.y) / 2 - startPoint.y;
				if(points["0"]) {
					if(points["1"]) {
						if(points["2"]) {
							return false;
						}else{
							points["2"] = {x:px,y:py};
						}
					}else{
						points["1"] = {x:px,y:py};
					}
				}else{
					points["0"] = {x:px,y:py};
				}
				return true;
			},
			select : function(other) {
				asso_group.style.stroke = "blue";
				if(other==undefined){
					diagramEditor.Select(this,false);
				}else{
					diagramEditor.Select(this,true);
				}
			},
			selectByOther : function() {
				asso_group.style.stroke = "red";
			},
			deselect : function(other) {
				asso_group.style.stroke = "black";
				if(other==undefined){
					diagramEditor.Deselect(this,false);
				}else{
					diagramEditor.Deselect(this,true);
				}
				
			},
			deselectByOther : function() {
				asso_group.style.stroke = "black";
				
			},
			destroy : function() {
				diagramEditor.getBase().removeChild(asso_group);
			},
			eachPanel : function(fn) {
				for(var key in propertyPanels) {
					fn(propertyPanels[key]);
				}
			},
			refresh : function() {
				var _points = this.getPoint();
				var s = new Point2D((startElement.getX() + startElement.getW() / 2), (startElement.getY() + startElement.getH() / 2));
				var e = new Point2D((endElement.getX() + endElement.getW() / 2), (endElement.getY() + endElement.getH() / 2));
				var __points = [s];
				for(var i=0;i < _points.length;i++) {
					__points.push(new Point2D(startPoint.x+_points[i].x, startPoint.y+_points[i].y));
				}
				__points.push(e);
				var start = getConnectionPoint(new Line2D(s.x, s.y, __points[1].x, __points[1].y), {x:startElement.getX(),y:startElement.getY(),w:startElement.getW(),h:startElement.getH()});
				var end = getConnectionPoint(new Line2D(e.x, e.y, __points[__points.length-2].x, __points[__points.length-2].y), {x:endElement.getX(),y:endElement.getY(),w:endElement.getW(),h:endElement.getH()});
				startPoint = start.point;
				endPoint = end.point;
				var end2 = Point2D.sub(end.point, start.point);
				var linestr = "";
				{
					_points.push(end2);
					if(diagramEditor.getOption('connection_style') == "bezier") {
						linestr = bezier(start, end, _points);
					}else{
						linestr = normal(_points);
					}
				}
				path.setAttribute('d', "M " + 0 + " " + 0 + linestr);
				col_path.setAttribute('d', "M " + 0 + " " + 0 + linestr);
				asso_group.setAttribute('transform', "translate("+start.point.x+","+start.point.y+")");
				
				//for Panel
				{
					var panelPos = {
							x : 0 + endPoint.x - startPoint.x,
							y : 0 + endPoint.y - startPoint.y
					};
					for(var i=0;i < _points.length;i++) {
						panelPos.x += _points[i].x;
						panelPos.y += _points[i].y;
					}
					panelPos.x /= (_points.length + 2);
					panelPos.y /= (_points.length + 2);
					panel_group.setAttribute('transform', "translate("+(panelPos.x)+","+(panelPos.y)+")");
				}
				
				for(var key in labels) {
					labels[key].refresh(end2);
				}
				for(var key in propertyPanels) {
					propertyPanels[key].refresh(null/*Math.abs(end2.x)*/, end2);
				}
				function bezier(start, end, _points) {
					var linestr = "";
					if(_points.length == 1) {
						var i = 0;
						if((start.collflg == 1 || start.collflg == 3) && (end.collflg == 2 || end.collflg == 4)) {
							linestr += " Q " + 0 + " " + _points[i].y + " " + _points[i].x + " " + _points[i].y;
						}else if((start.collflg == 2 || start.collflg == 4) && (end.collflg == 1 || end.collflg == 3)) {
							linestr += " Q " + _points[i].x + " " + 0 + " " + _points[i].x + " " + _points[i].y;
						}else{
							var tx = _points[i].x / 2;
							var ty = _points[i].y / 2;
							if(start.collflg == 1) {
								linestr += " Q " + 0 + " " + ty + " " + tx + " " + ty;
							}else if(start.collflg == 2) {
								linestr += " Q " + tx + " " + 0 + " " + tx + " " + ty;
							}else if(start.collflg == 3) {
								linestr += " Q " + 0 + " " + ty + " " + tx + " " + ty;
							}else if(start.collflg == 4) {
								linestr += " Q " + tx + " " + 0 + " " + tx + " " + ty;
							}
							if(end.collflg == 1) {
								linestr += " Q " +  _points[i].x + " " +  ty + " " + _points[i].x + " " + _points[i].y;
							}else if(end.collflg == 2) {
								linestr += " Q " +  tx + " " +  _points[i].y + " " + _points[i].x + " " + _points[i].y;
							}else if(end.collflg == 3) {
								linestr += " Q " +  _points[i].x + " " +  ty + " " + _points[i].x + " " + _points[i].y;
							}else if(end.collflg == 4) {
								linestr += " Q " +  tx + " " +  _points[i].y + " " + _points[i].x + " " + _points[i].y;
							}
						}
					}else{
						for(var i=0;i < _points.length;i++) {
							linestr += " L " + _points[i].x + " " + _points[i].y;
						}
					}
					return linestr;
				}
				function normal(_points) {
					var linestr = "";
					for(var i=0;i < _points.length;i++) {
						linestr += " L " + _points[i].x + " " + _points[i].y;
					}
					return linestr;
				}
				function getConnectionPoint(d, bound) {
					if(d.intersectsLine(bound.x, bound.y, bound.x+bound.w, bound.y)) {
						return {collflg : 1, point : d.getConnect(new Line2D(bound.x, bound.y, bound.x+bound.w, bound.y))};
					}
					if(d.intersectsLine(bound.x+bound.w, bound.y, bound.x+bound.w, bound.y+bound.h)) {
						return {collflg : 2, point : d.getConnect(new Line2D(bound.x+bound.w, bound.y, bound.x+bound.w, bound.y+bound.h))};
					}
					if(d.intersectsLine(bound.x+bound.w, bound.y+bound.h, bound.x, bound.y+bound.h)) {
						return {collflg : 3, point : d.getConnect(new Line2D(bound.x+bound.w, bound.y+bound.h, bound.x, bound.y+bound.h))};
					}
					if(d.intersectsLine(bound.x, bound.y+bound.h, bound.x, bound.y)) {
						return {collflg : 4, point : d.getConnect(new Line2D(bound.x, bound.y+bound.h, bound.x, bound.y))};
					}
					return {collflg : 0, point : new Point2D(bound.x, bound.y)};
				}
			},
			getPanelGroup : function() {
				return panel_group;
			},
			getCollGroup : function() {
				return asso_group;
			},
			create : function(start, end) {
				var self = this;
				startElement = start;
				endElement = end;
				startElement.addConnection(this);
				endElement.addConnection(this);
				asso_group = document.createElementNS(SVG, 'g');
				panel_group = document.createElementNS(SVG, 'g');
				path = document.createElementNS(SVG,'path');
				col_path = document.createElementNS(SVG,'path');
				path.setAttribute('d', "M " + start.getX() + " " + start.getY() + " L " + end.getX() + " " + end.getY());
				path.setAttribute("style", "fill:none;stroke:#000000;stroke-width:1px");
				path.setAttribute("pointer-events", "visibleStroke");
				col_path.setAttribute('d', "M " + start.getX() + " " + start.getY() + " L " + end.getX() + " " + end.getY());
				col_path.setAttribute("style", "fill:none;stroke:white;stroke-width:9px;");
				col_path.setAttribute("visibility", "hidden");
				col_path.setAttribute("pointer-events", "stroke");
				asso_group.appendChild(path);
				asso_group.appendChild(col_path);
				asso_group.appendChild(panel_group);
				
				//Graphic定義に基づいて設定する
				if(instanceData.graphic) {
					graphicConfig = diagramEditor.getConnectionGraphic(instanceData.graphic);
				}else{
					graphicConfig = diagramEditor.getConnectionGraphic(metaConnection.graphic);
				}
				if(graphicConfig) {
					if(graphicConfig.line_type == "dot") {
						path.setAttribute("stroke-dasharray", "8 8");
					}
					if(graphicConfig.source_arrow != "none") {
						if(graphicConfig.source_arrow == "circle" || graphicConfig.source_arrow == "black_circle") {
							path.setAttribute("marker-start", "url(#mk-"+graphicConfig.source_arrow+")");
						}else{
							path.setAttribute("marker-start", "url(#mk-start-"+graphicConfig.source_arrow+")");
						}
					}
					if(graphicConfig.target_arrow != "none") {
						path.setAttribute("marker-end", "url(#mk-"+graphicConfig.target_arrow+")");
					}
					var current_hposition = 0;
					for(var key in graphicConfig.panels) {
						var p = new clooca.diagrameditor.Panel(diagramEditor, this, current_hposition);
						p.create(graphicConfig.panels[key]);
						current_hposition += p.getHeight();
						panel_group.appendChild(p.getGroupSVGElement());
						propertyPanels[key] = p;
					}
					
					for(var key in graphicConfig.labels) {
						var label = new clooca.diagrameditor.ConnectionLabel(asso_group);
						var metaPropertyId = graphicConfig.labels[key].property;
						var metaProperty = diagramEditor.getCompiledTool().getProperty(metaPropertyId);
						var propertyName = metaProperty.name;
						label.create(graphicConfig.labels[key]);
						labels[propertyName] = label;
					}
				}
				diagramEditor.getBase().appendChild(asso_group);
				this.refresh();
				col_path.addEventListener("mouseover", function (e) {
					asso_group.style.cursor = "all-scroll";
				}, false);
				col_path.addEventListener("mouseout", function (e) {
					asso_group.style.cursor = "default";
				}, false);
				col_path.addEventListener("mousedown", function (e) {
				    diagramEditor.selectedObject.select(self);
				    self.select();
				}, false);
				col_path.addEventListener("dblclick", function (e) {
				    diagramEditor.selectedObject.select(self);
				    self.select();
	        		self.addPoint(0,0);
				}, false);
			},
			getMetaConnection : function() {
				return metaConnection;
			}
		}
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
	window.clooca.diagrameditor.Connection = Connection;

}());