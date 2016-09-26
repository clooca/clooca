function ConnectionLabel(_parentGroup) {
	this.text_element = null;
	this.text_elements = [];
	this.parentGroup = _parentGroup;
	this.label = null;
}

ConnectionLabel.prototype.getTextSVGElement = function() {
	return this.text_element;
};

ConnectionLabel.prototype.refresh = function(vec) {
	var len = Math.sqrt(vec.getX() * vec.getX() + vec.getY() * vec.getY());
	var u = label.x;
	var v = label.y;
	var x = vec.getX() / 100 * u + vec.getY() / len * v;
	var y = vec.getY() / 100 * u + -vec.getX() / len * v;
	text_element.setAttribute('x', x);
	text_element.setAttribute('y', y);
};

ConnectionLabel.prototype.create = function(_label) {
	this.label = _label;
	var text_element = document.createElementNS(SVG,'text');
	text_element.setAttribute('x', label.x);
	text_element.setAttribute('y', label.y);
	text_element.setAttribute('font-family', "MS-PMincho");
	text_element.setAttribute('font-size', label.fontsize);
	text_element.setAttribute('fill', "black");
	text_element.textContent = "　";
	this.text_element = text_element;
	var rect_element = document.createElementNS(SVG,'rect');
	rect_element.setAttribute('x', label.x);
	rect_element.setAttribute('y', label.y);
	rect_element.setAttribute('width', 120);
	rect_element.setAttribute('height', 20);
	rect_element.setAttribute('fill', "none");
	rect_element.setAttribute('stroke', "blue");
	this.parentGroup.appendChild(this.text_element);
	this.parentGroup.appendChild(rect_element);
};

ConnectionLabel.prototype.create_a_label = function(index, text) {
	var fontsize = Number(text_element.getAttribute("font-size"));
	var tele = document.createElementNS(SVG,'text');
	tele.setAttribute('x', text_element.getAttribute("x"));
	tele.setAttribute('y', Number(text_element.getAttribute("y")) + index*(fontsize+1));
	tele.setAttribute('font-family', "MS-PMincho");
	tele.setAttribute('font-size', fontsize);
	tele.setAttribute('fill', "black");
	tele.textContent = text;
	this.parentGroup.appendChild(tele);
	this.text_elements.push(tele);
}

ConnectionLabel.prototype.setValue = function(value) {
	if(value instanceof Array) {
		for(var i=0;i < text_elements.length;i++) {
			this.parentGroup.removeChild(text_elements[i]);
		}
		this.text_elements = [];
		for(var i=0;i < value.length;i++) {
			this.create_a_label(i,value[i]);
		}
	}else{
		this.text_element.textContent = value;
	}
}

module.exports = ConnectionLabel;