function VerticalPanel(_diagramEditor, _node,hposition) {
	var diagramEditor = _diagramEditor;
	var group_element = null;
	var parentNode = _node;
	var labels = {};
	var panels = {};
	var style = "";
	var styleobj = null;
	
	function _getWidth() {
		var maxw = 0;
		for(var key in labels) {
			if(maxw < labels[key].getWidth()) {
				maxw = labels[key].getWidth();
			}
		}
		return maxw;
	}
	function _getHeight() {
		var h = 0;
		for(var key in labels) {
			h += labels[key].getHeight();
		}
		return h;
	}
	function _resize(parentW, parentH) {
		if(styleobj == null) return;
		var w = _getWidth();
		var h = _getHeight();
		if(parentW && parentW > w) {
			w = parentW;
			styleobj.setAttribute("width",parentW);
		}else{
			if(w > Number(styleobj.getAttribute("width"))) {
				styleobj.setAttribute("width",w);
			}
		}
		if(parentH && parentH - style.top > h) {
			h = parentH - style.top
		}
		styleobj.setAttribute("height", h);
		_refresh(w);
	}
	function _findLabel(prop_id) {
		for(var key in labels) {
			var l = labels[key].findLabel(prop_id);
			if(l) return l;
		}
		for(var key in panels) {
			var l = panels[key].findLabel(prop_id);
			if(l) return l;
		}
		return null;
	}
	function _findLabelCollection(propertyName) {
		if(labels[propertyName]) return labels[propertyName];
		for(var key in panels) {
			var l = panels[key].findLabelCollection(propertyName);
			if(l) return l;
		}
		return null;
	}
	function _setValue(id, value) {
		var l = _findLabel(id, value);
		if(l) l.setValue(value);
	}
	function refresh_vbox(w) {
		labels_array = [];
		for(var key in labels) {
			labels_array.push(labels[key]);
		}
		labels_array.sort(function(a,b){if( a.getOrder() < b.getOrder() ) return -1;if( a.getOrder() > b.getOrder() ) return 1;return 0;});
		var h = 0;
		for(var i=0;i < labels_array.length;i++) {
			labels_array[i].refresh(w);
			labels_array[i].setPosition(h);
			h += labels_array[i].getHeight();
		}
	}
	function refresh_relative(w, vec) {
		labels_array = [];
		for(var key in labels) {
			labels_array.push(labels[key]);
		}
		labels_array.sort(function(a,b){if( a.getOrder() < b.getOrder() ) return -1;if( a.getOrder() > b.getOrder() ) return 1;return 0;});
		for(var i=0;i < labels_array.length;i++) {
			var len = Math.sqrt(vec.getX() * vec.getX() + vec.getY() * vec.getY());
			var u = labels_array[i].getStyle().u - 50;
			var v = labels_array[i].getStyle().v;
			var x = vec.getX() / 100 * u + vec.getY() / len * v;
			var y = vec.getY() / 100 * u + -vec.getX() / len * v;
			labels_array[i].refresh(w);
			labels_array[i].setPos(x, y);
		}
	}
	function _refresh(w, vec) {
		if(style.layout == "vbox") {
			refresh_vbox(w);
		}else if(style.layout == "hbox") {
			
		}else if(style.layout == "absolutely") {
			
		}else if(style.layout == "relative") {
			refresh_relative(w, vec);
		}
	}
	return {
		create : function(panel){
			style = panel.styleObject;
			//メイングループ作成
			group_element = document.createElementNS(SVG,'g');
			//パネルスタイルを設定
			if(style && style != "") {
				styleobj = document.createElementNS(SVG,'rect');
				if(style.border == "solid") {
					group_element.style.fill = "none";
					group_element.style.stroke = "black";
				}else{
					group_element.style.fill = "none";
					group_element.style.stroke = "none";
				}
				group_element.appendChild(styleobj);
			}
			for(var key in panel.panels) {
				
			}
			for(var key in panel.labels) {
				var metaPropertyId = panel.labels[key].property;
				var metaProperty = diagramEditor.getCompiledTool().getProperty(metaPropertyId);
				var _enum = null;
				if(diagramEditor.getCompiledTool().checkEnumeration(metaProperty.type)) {
					_enum = diagramEditor.getCompiledTool().getEnumeration(metaProperty.type);
				}
				if(metaProperty.lower == 1 && metaProperty.upper == 1) {
					label = new LabelCollection(this, panel.labels[key], metaProperty, _enum);
					if(!_enum) label.enable("edit");
					label.addLabel(metaProperty.name, "");
					labels[metaProperty.name] = label;
				}else{
					label = new LabelCollection(this, panel.labels[key], metaProperty, _enum);
					labels[metaProperty.name] = label;
				}
			}
			//位置を設定
			group_element.setAttribute('transform', "translate("+0+","+style.top+")");
		},
		//表示を更新
		refresh : _refresh,
		getParentNode : function() {
			return parentNode;
		},
		getGroupSVGElement : function() {
			return group_element;
		},
		eachLabelCollection : function(fn) {
			for(var key in labels) {
				fn(labels[key])
			}
		},
		eachLabel : function(fn) {
			for(var key in labels) {
				labels[key].eachLabel(fn);
			}
		},
		findLabel : _findLabel,
		findLabelCollection : _findLabelCollection,
		resize : function(w,h) {
			_resize(w,h);
		},
		getWidth : _getWidth,
		getHeight : _getHeight,
		setPosition : function(hposition) {
			group_element.setAttribute('transform', "translate("+0+","+(hposition + style.top)+")");
		},
		getPosition : function() {
			return (hposition + style.top);
		}
	}
}

module.exports = VerticalPanel;