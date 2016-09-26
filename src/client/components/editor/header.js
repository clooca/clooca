var React = require('react');
var Link = require('react-router').Link;
var Menu = require('../menu');
var MenuItem = require('../menu/item');
var Resources = require('./resources');
var AddTabModal = require('../modal/addTab');
var AddObjectModal = require('../modal/addObject');
var AddContainmentModal = require('../modal/addContainment');
var ImportJSONModal = require('../modal/importJSON');
var ExportJSONModal = require('../modal/exportJSON');
var TabAction = require('../../actions/tab');
var ModalAction = require('../../actions/modal');
var querystring = require('querystring');

var repository = require('../../../common/core/repository');

let Header = React.createClass({

  getInitialState: function () {
    return {
      isOpenAddTabModal: false,
      isOpenImportJSONModal: false,
      isOpenExportJSONModal: false,
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
    repository.save(clooca, modelJson.uri, modelJson.data).then(()=>{

    });
  },

  onImportMenuSelected: function() {
    this.setState({
      isOpenImportJSONModal: true
    });
  },

  onExportMenuSelected: function() {
    this.setState({
      isOpenExportJSONModal: true
    });
  },

  onCloseImportJSONModal: function() {
    this.setState({
      isOpenImportJSONModal: false
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

  onCloseExportJSONModal: function() {
    this.setState({
      isOpenExportJSONModal: false
    });
  },

  onDatasourceSelected: function(uri) {
    clooca.getModelInterface().setCurrentModel(uri);
  },

  render: function () {
    return (
    	<div className="core-header" style={{height:"32px", borderBottom:"solid 1px #333"}}>
    		<div style={{float:"left", "marginLeft":"12px"}}>
	    		<div><Link to="/projects">←Return</Link></div>
    		</div>
    		<div style={{float:"left", "marginLeft":"30px"}}>
    			<Menu>
            <MenuItem onSelect={this.onAddObjectMenuSelected}>オブジェクトを追加</MenuItem>
            <MenuItem onSelect={this.onAddTabMenuSelected}>タブを追加</MenuItem>
            <MenuItem onSelect={this.onSaveMenuSelected}>モデルを保存</MenuItem>
            <MenuItem onSelect={this.onImportMenuSelected}>インポート</MenuItem>
            <MenuItem onSelect={this.onExportMenuSelected}>エクスポート</MenuItem>
            <MenuItem><Resources onSelect={this.onDatasourceSelected}/></MenuItem>
          </Menu>
    		</div>
        <div style={{overflow:'hidden', clear:'both'}}></div>
          <AddTabModal isOpen={this.state.isOpenAddTabModal} onOk={this.addTab} onClose={this.onCloseAddTabModal} pluginNames={this.props.pluginNames}></AddTabModal>
          <AddObjectModal isOpen={this.props.editorSettings.isOpenAddObjectModal} onClose={this.onCloseAddObjectModal} uri={this.props.editorSettings.uri}></AddObjectModal>
          <AddContainmentModal isOpen={this.props.editorSettings.isOpenAddContainmentModal} onClose={this.onCloseAddContainmentModal} model={this.props.editorSettings.target} resourceSet={this.props.editorSettings.resourceSet}></AddContainmentModal>
          <ImportJSONModal isOpen={this.state.isOpenImportJSONModal} onClose={this.onCloseImportJSONModal}></ImportJSONModal>
          <ExportJSONModal isOpen={this.state.isOpenExportJSONModal} onClose={this.onCloseExportJSONModal}></ExportJSONModal>
    	</div>
    );
  }
});

module.exports = Header;