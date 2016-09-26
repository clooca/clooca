/**
 * ラベル
 * @param _parentGroup
 * @param _parentNode
 * @returns
 */
function Label(_parentPanel, _propertyName, _id) {
	//対応するプロパティのURI
	var propertyName = _propertyName;
	var propid = _id;
	var config = {};
	//SVGのテキスト要素
	var text_element = null;
	var edit_button = null;
	//ラベルコレクション
	var parentPanel = _parentPanel;
	//親ノード
	var parentNode = parentPanel.getParentNode();
	var parentPanelGroup = parentNode.getPanelGroup();
	var parentCollGroup = parentNode.getCollGroup();
	var format = null;
	//style
	var styleObject = null;
	var custom = false;
	var left = 0;
	var marker = null;
	function _setValue(value) {
		if(parentPanel.is_enum()) {
			text_element.textContent = parentPanel.getDispValue(value);
		}else{
			if(value==undefined || value==null) return;
			if(parentPanel.getMetaProperty().type == "text") {
				while (text_element.firstChild) {
					text_element.removeChild(text_element.firstChild);
				}
				var lines = value.split("\n");
				var fontsize = Number(text_element.getAttribute("font-size"));
				for(var i = 0; i < lines.length; i++) {
					var tspan = document.createElementNS(SVG, 'tspan');
					tspan.textContent = lines[i];
					tspan.setAttribute('x', 0);
					tspan.setAttribute('y', (i+1)*fontsize);
					text_element.appendChild(tspan);
				}
			}else{
				
				if(typeof value == "string") {
					if(custom && format) {
						var parentModel = parentNode.getDiagramEditor().getModelController().get(parentNode.getID());
						var compiledParentModel = parentNode.getDiagramEditor().getModelController().getCompiledModelPart(parentModel);
						text_element.textContent = format.Exec(compiledParentModel).output;	//value[value._sys_id];
					}else{
						text_element.textContent = value;
					}
				}else{
					if(format) {
						var compiledModel = parentNode.getDiagramEditor().getModelController().getCompiledModelPart(value);
						text_element.textContent = format.Exec(compiledModel).output;	//value[value._sys_id];
					}else{
						text_element.textContent = value[value._sys_id];
					}
				}
			}
		}
	}
	function _getWidth() {
		var fontsize = Number(text_element.getAttribute("font-size"));
		return clooca.core.StrLen(text_element.textContent) * (fontsize / 2);
	}
	function _getHeight() {
		var fontsize = Number(text_element.getAttribute("font-size"));
		return fontsize;
	}
	return {
		refreshContent : function() {
			if(custom) {
				var parentModel = parentNode.getDiagramEditor().getModelController().get(parentNode.getID());
				_setValue("");
			}
		},
		getTextSVGElement : function() {
			return text_element;
		},
		enable : function(attr) {
			config[attr] = true;
		},
		destroy : function() {
			if(styleObject.marker) {
				parentPanel.getGroupSVGElement().removeChild(marker);
			}
			parentPanel.getGroupSVGElement().removeChild(text_element);
			parentCollGroup.removeChild(edit_button);
		},
		create : function(option) {
			var self = this;
			styleObject = option.styleObject;
			custom = option.custom;
			format = option.format;
			text_element = document.createElementNS(SVG,'text');
			left = styleObject.left;
			console.log("left", styleObject);
			text_element.setAttribute('x', left);
			text_element.setAttribute('y', option.y || 0);
			text_element.setAttribute('font-family', "MS-PMincho");
			text_element.setAttribute('font-size', option.fontsize);
			text_element.setAttribute('fill', "black");
			text_element.textContent = "";
			if(option.styleObject.marker) {
				marker = document.createElementNS(SVG,'rect');
				marker.setAttribute('x', left);
				marker.setAttribute('y', option.y);
				marker.setAttribute('width', 120);
				marker.setAttribute('height', 20);
				marker.setAttribute('rx', 10);
				marker.setAttribute('ry', 10);
				marker.setAttribute('fill-opacity', 0.5);
				marker.setAttribute('fill', "#7777ff");
				marker.setAttribute('stroke', "blue");
				parentPanel.getGroupSVGElement().appendChild(marker);
			}
			parentPanel.getGroupSVGElement().appendChild(text_element);
			
			edit_button = document.createElementNS(SVG,'rect');
			edit_button.setAttribute("stroke", "#771177");
			edit_button.setAttribute("stroke-width", 2);
			edit_button.setAttribute("stroke-dasharray", 2);
			edit_button.setAttribute("fill", "none");
			edit_button.setAttribute("pointer-events", "fill");
			edit_button.setAttribute("visibility", "hidden");
			
			parentCollGroup.appendChild(edit_button);
			edit_button.addEventListener("dblclick", function (e) {
				if(config["edit"]) {
					var newTextArea = document.createElement('textarea');
					newTextArea.style.position = "absolute";
					newTextArea.style.overflow = "visible";
					newTextArea.style.resize = "none";
					newTextArea.style['z-index'] = 5;
					newTextArea.style.left = parentNode.getX() + "px";
					newTextArea.style.top = parentNode.getY() + "px";
					newTextArea.style.width = parentNode.getW() + "px";
					newTextArea.style.height = _getHeight() + "px";
					newTextArea.value = text_element.textContent;
					parentNode.diagramEditor.currentTextArea = newTextArea;
					parentNode.diagramEditor.editfield.appendChild(newTextArea);
					newTextArea.addEventListener("blur", function(e) {
						var v = e.target.value;
						parentNode.diagramEditor.updateProperty(parentNode.getID(), propertyName, v);
						self.setValue(v);
					});
				}else{
					parentNode.diagramEditor.fireOnDblClick({
						instanceURI:parentNode.getID(),
						propertyName:propertyName,
						propid:propid});
				}
			}, false);
		},
		/**
		 * @param value
		 * ラベルの表示値を設定する
		 */
		setValue : _setValue,
		/**
		 * ラベルの幅を取得する
		 */
		getWidth : _getWidth,
		/**
		 * ラベルの高さを取得する
		 */
		getHeight : _getHeight,
		/**
		 * @param y
		 * ラベルの位置を設定する
		 */
		setPosition : function(y) {
			var fontsize = Number(text_element.getAttribute("font-size"));
			if(styleObject.align == "left") {
				text_element.setAttribute('x', left);
			}else if(styleObject.align == "center") {
				text_element.setAttribute('x', left + (parentNode.getW() / 2) - (_getWidth() / 2));
			}else if(styleObject.align == "right") {
				text_element.setAttribute('x', left + parentNode.getW() - _getWidth());
			}
			text_element.setAttribute('y', y+fontsize);
			edit_button.setAttribute('x', left);
			edit_button.setAttribute('y', this.getPosition());
			if(marker) {
				marker.setAttribute('x', left-2);
				marker.setAttribute('y', y);
			}

		},
		/**
		 * ラベルの位置を取得する
		 */
		getPosition : function() {
			var fontsize = Number(text_element.getAttribute("font-size"));
			return Number(text_element.getAttribute('y')) - fontsize + Number(parentPanel.getPosition());
		},
		/**
		 * ラベルの表示を更新する
		 */
		refresh : function() {
			var w = _getWidth();
			if(w < 12) w = 12;
			edit_button.setAttribute('width', w);
			edit_button.setAttribute('height', _getHeight());
			if(marker) {
				marker.setAttribute('width', w+1);
				//console.log("_getWidth", text_element.textContent);
			}
		},
		isCustom : function() {
			return custom;
		}
	}
}

module.exports = Label;