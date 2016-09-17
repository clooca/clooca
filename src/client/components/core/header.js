var React = require('react');
var Menu = require('../menu');
var MenuItem = require('../menu/item');
var AddTabModal = require('../modal/addTab');
var AddObjectModal = require('../modal/addObject');
var AddContainmentModal = require('../modal/addContainment');
var TabAction = require('../../actions/tab');
var ModalAction = require('../../actions/modal');

let Header = React.createClass({

  getInitialState: function () {
    return {
      isOpenAddTabModal: false,
      isOpenAddObjectModal: this.props.editorSettings.isOpenAddObjectModal,
      isOpenAddContainmentModal: this.props.editorSettings.isOpenAddContainmentModal
    };
  },

  componentWillMount: function() {
  	var setState = this.setState.bind(this);
    
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      isOpenAddContainmentModal: nextProps.editorSettings.isOpenAddContainmentModal
    });
  },

  addTab: function(newTab) {
    TabAction.add(newTab);
  },

  onAddTabMenuSelected: function() {
    this.setState({
      isOpenAddTabModal: true
    });
  },

  onAddObjectMenuSelected: function() {
    let cc = clooca.getCC();
    cc.request('clooca', 'modal', {
      isOpenAddObjectModal: true
    }).then(() => {
    });
  },

  onSaveMenuSelected: function() {
    let modelJson = clooca.getModelInterface().getModelJSON();
    clooca.getStorage().save('default', modelJson).then(()=>{

    });
  },

  onCloseAddTabModal: function() {
    this.setState({
      isOpenAddTabModal: false
    });
  },

  onCloseAddObjectModal: function() {
    ModalAction.close();
  },

  onCloseAddContainmentModal: function() {
    ModalAction.close();
  },

  render: function () {
    return (
    	<div className="core-header" style={{height:"32px", borderBottom:"solid 1px #333"}}>
    		<div style={{float:"left"}}>
	    		<div>clooca</div>
    		</div>
    		<div style={{float:"left", "marginLeft":"30px"}}>
    			<Menu>
            <MenuItem title="オブジェクトを追加" onSelect={this.onAddObjectMenuSelected}></MenuItem>
            <MenuItem title="タブを追加" onSelect={this.onAddTabMenuSelected}></MenuItem>
            <MenuItem title="モデルを保存" onSelect={this.onSaveMenuSelected}></MenuItem>
          </Menu>
    		</div>
        <div style={{overflow:'hidden', clear:'both'}}></div>
          <AddTabModal isOpen={this.state.isOpenAddTabModal} onOk={this.addTab} onClose={this.onCloseAddTabModal} pluginNames={this.props.pluginNames}></AddTabModal>
          <AddObjectModal isOpen={this.props.editorSettings.isOpenAddObjectModal} onClose={this.onCloseAddObjectModal}></AddObjectModal>
          <AddContainmentModal isOpen={this.props.editorSettings.isOpenAddContainmentModal} onClose={this.onCloseAddContainmentModal} model={this.props.editorSettings.target} resourceSet={this.props.editorSettings.resourceSet}></AddContainmentModal>
    	</div>
    );
  }
});

module.exports = Header;