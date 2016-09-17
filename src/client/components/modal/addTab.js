var React = require('react');
var Modal = require('react-modal');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#272525',
    color                 : '#fff'
  }
};


var AddTabModal = React.createClass({

  getInitialState: function() {
    return {
    	modalIsOpen: false
    };
  },

  afterOpenModal: function() {
  },

  closeModal: function() {
  	this.props.onClose();
  },

  okModal: function() {
    var title = this.refs.title.value;
    var pluginName = this.refs.plugins.value;
    this.props.onOk({title:title, plugin:pluginName});
    this.props.onClose();
  },

  componentWillReceiveProps: function() {
  },

  render: function() {
    var options = this.props.pluginNames.map(function(name) {
      return (<option key={'addtab-'+name}>{name}</option>);
    });
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2>タブの追加</h2>

          <div className="core-modal-form">
            <span className="core-modal-form-label">プラグイン</span>
            <div className="core-modal-form-input">
              <select ref="plugins">{options}</select>
            </div>
          </div>
          <div className="core-modal-form">
            <span className="core-modal-form-label">作成するタブの名前</span>
            <div className="core-modal-form-input">
              <input ref="title" type="text" />
            </div>
          </div>
          <button onClick={this.okModal}>OK</button>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    );
  }
});

module.exports = AddTabModal;