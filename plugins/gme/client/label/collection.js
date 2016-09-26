/**
 * ラベルコレクション
 * @param _parentNode
 */
function LabelCollection(_parentPanel,_config, _property, __enum) {
	//対応するプロパティのURI
	var propURI = null;
	var metaProperty = _property;
	var propertyName = metaProperty.name;
	var _enum = __enum;
	var config = _config;
	//SVGの要素
	var group_element = null;
	var styleobj = null;
	//親ノード
	var parentPanel = _parentPanel;
	var parentNode = parentPanel.getParentNode();
	var parentPanelGroup = parentNode.getPanelGroup();
	var parentCollGroup = parentNode.getCollGroup();
	var labels = {};
	var hposition = 0;
	//style
	var style = null;
	/*
	var border = "solid";
	var order = 0;
	var layout = "vbox";
	var top = 0;
	*/
	create(config);
	function create(option) {
		//メイングループ作成
		group_element = document.createElementNS(SVG,'g');
		//位置を設定
		style = option.styleObject;
		styleobj = document.createElementNS(SVG,'rect');
		group_element.appendChild(styleobj);
		if(style.border == "solid") {
			group_element.style.fill = "none";
			group_element.style.stroke = "black";
			//border表示用のrectがないといけない
		}else{
			group_element.style.fill = "none";
			group_element.style.stroke = "none";
		}
		parentPanel.getGroupSVGElement().appendChild(group_element);
	}
	function _getNode() {
		
	}
	function _getX() {
		
	}
	function _getY() {
		return top;
	}
	function _getW() {
		return 10;
	}
	function _getH() {
		var h = 0;
		for(var key in labels) {
			h += labels[key].getHeight();
		}
		return h;
	}
	function _findLabel(prop_id) {
		if(labels.hasOwnProperty(prop_id)) {
			return labels[prop_id];
		}
		return null;
	}
	function _RemoveLabel(index) {
		
	}
	function _UpdateLabel(index, value) {
		
	}
	function _refresh(w) {
		if(style.layout == "vbox") {
			refresh_vbox(w);
		}else if(style.layout == "hbox") {
			
		}else if(style.layout == "absolutely") {
			
		}
	}
	function refresh_vbox(w) {
		var h = 0;
		for(var key in labels) {
			labels[key].setPosition(h);
			labels[key].refresh();
			h += labels[key].getHeight();
		}
		setWidth(w);
		setHeight(h);
	}
	function setWidth(w) {
		if(w) styleobj.setAttribute('width', w);
	}
	function setHeight(h) {
		if(h) styleobj.setAttribute('height', h);
	}
	return {
		getMetaProperty : function() {
			return metaProperty;
		},
		getParentNode : function() {
			return parentNode;
		},
		getWidth : _getW,
		getHeight : _getH,
		addLabel : function _addLabel(id, value) {
			var label = new Label(this, propertyName, id);
			if(config["edit"]) label.enable("edit");
			label.create({
				x:config.x,
				y:config.y,
				fontsize:config.fontsize,
				format:config.format,
				custom : config.custom,
				styleObject : config.styleObject
			});
			label.setValue(value);
			labels[id] = label;
			_refresh();
		},
		removeLabel : function _addLabel(id) {
			labels[id].destroy();
			delete labels[id];
			_refresh();
		},
		findLabel : _findLabel,
		refresh : _refresh,
		eachLabel : function(fn) {
			for(var key in labels) {
				fn(labels[key])
			}
		},
		getGroupSVGElement : function() {
			return group_element;
		},
		getStyle : function() {
			return style;
		},
		getOrder : function() {
			return style.order;
		},
		setPosition : function(_hposition) {
			hposition = _hposition;
			group_element.setAttribute('transform', "translate("+0+","+hposition+")");
		},
		setPos : function(x, y) {
			hposition = y;
			group_element.setAttribute('transform', "translate("+x+","+y+")");
		},
		getPosition : function() {
			return hposition + parentPanel.getPosition();
		},
		enable : function(attr) {
			config[attr] = true;
		},
		is_enum : function() {
			if(_enum) return true;
			return false;
		},
		getDispValue : function(name) {
			for(var i=0;i < _enum.values.length;i++) {
				if(_enum.values[i].name == name) {
					return _enum.values[i].text;
				}
			}
			return "";
		}
	}
}

module.exports = LabelCollection;