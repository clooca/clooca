var Point2D = require('../../math/math2d').Point2D;
var selectorAction = require('../../actions/selector');

var DRAG_NONE = 0;
var DRAG_MOVE = 1;

let AbstractGNode = {

  getInitialState: function () {
    return {
      x:this.props.node.get('x'),
      y:this.props.node.get('y')
    };
  },

  componentWillMount: function() {
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  onClick: function() {
    console.log('click');
    if (window.isSelectMode) {
      return;
    }
    if (!window.isAssociationMode) {
      return;
    }

    // クリックされたノードを取得する
    var node = this.props.node;
    console.log(window.sourceNode);
    if (!window.sourceNode) {
      window.sourceNode = node;
      return;
    }
    var modelInterface = clooca.getModelInterface();
    var resourceSet = modelInterface.getResourceSet();
    var model = modelInterface.getCurrentModel();
    model.each(function(iterator) {
      // Associationを追加
      var associations = window.sourceNode.get('associations');
      var associationEclass = resourceSet.elements('EClass').filter((eClass) => {
        return eClass.get('name') == 'Association';
      })[0];
      var association = associationEclass.create(
        {
          name:new Date().getTime(),
          source:window.sourceNode,
          target:node
        }
      );
      associations.add(association);

      window.sourceNode = null;
    });
  },

  onMouseDown: function(e) {
    console.log('onMouseDown');
    this.offset = new Point2D(e.pageX-this.state.x, e.pageY-this.state.y);
    this.setState({
      dragMode: DRAG_MOVE
    });
    selectorAction.select(this.props.id);

    if (!window.isAssociationMode) {
      window.nodeDragging = true;
    }
  },

  onMouseMove: function(e) {
    //console.log('onMouseMove');
    if(this.state.dragMode == DRAG_MOVE) {
      //console.log( this.offset );
      var currentPos = new Point2D(e.pageX, e.pageY);
      var dd = currentPos.sub(this.offset);
      //console.log(dd);
      if(this.props.onMoved) {
        this.props.onMoved(dd);
      }
      this.setState({
        x: dd.x,
        y: dd.y
      });
      this.props.node.set('x', dd.x);
      this.props.node.set('y', dd.y);
    }

  },

  onMouseUp: function(e) {
    console.log('onMouseUp');

    if (!window.isAssociationMode) {
      setTimeout(function() {
        window.nodeDragging = false;
      }, 500);
    }

    if(this.state.dragMode == DRAG_MOVE) {
      
    }
    this.state.dragMode = DRAG_NONE;

  },

  onMouseEnter: function() {
    console.log('onMouseEnter');

  },

  onMouseLeave: function() {
    console.log('onMouseLeave');
    this.state.dragMode = DRAG_NONE;

  },


  onMouseOut: function() {
    console.log('onMouseOut');

  },

  onMouseOver: function() {
    console.log('onMouseOver');

  }
};
module.exports = AbstractGNode;