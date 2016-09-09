var React = require('react');
var Modal = require('react-modal');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


var AddTabModal = React.createClass({

  getInitialState: function() {
    return {
    	modalIsOpen: false
    };
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
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
      return (<option>{name}</option>);
    });
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">タブの追加</h2>
          <select ref="plugins">{options}</select>
          <input ref="title" type="text" />
          <button onClick={this.okModal}>OK</button>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    );
  }
});

module.exports = AddTabModal;