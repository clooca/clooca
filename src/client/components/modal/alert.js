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


var AlertModal = React.createClass({

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
  	this.props.onClose();
  },

  componentWillReceiveProps: function(nextProps) {
  },

  render: function() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h3>{this.props.title}</h3>
          <div>{this.props.message}</div>
          <button onClick={this.okModal}>OK</button>
        </Modal>
      </div>
    );
  }
});

module.exports = AlertModal;