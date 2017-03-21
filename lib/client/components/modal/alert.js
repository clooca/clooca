'use strict';

var React = require('react');
var Modal = require('react-modal');

var customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#272525',
    color: '#fff'
  }
};

var AlertModal = React.createClass({
  displayName: 'AlertModal',


  getInitialState: function getInitialState() {
    return {
      modalIsOpen: false
    };
  },

  afterOpenModal: function afterOpenModal() {},

  closeModal: function closeModal() {
    this.props.onClose();
  },

  okModal: function okModal() {
    this.props.onClose();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        Modal,
        {
          isOpen: this.props.isOpen,
          onAfterOpen: this.afterOpenModal,
          onRequestClose: this.closeModal,
          style: customStyles },
        React.createElement(
          'h3',
          null,
          this.props.title
        ),
        React.createElement(
          'div',
          null,
          this.props.message
        ),
        React.createElement(
          'button',
          { onClick: this.okModal },
          'OK'
        )
      )
    );
  }
});

module.exports = AlertModal;
//# sourceMappingURL=alert.js.map
