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

var ExportJSONModal = React.createClass({
  displayName: 'ExportJSONModal',


  getInitialState: function getInitialState() {
    return {
      eClassNames: [],
      isOpen: false
    };
  },

  afterOpenModal: function afterOpenModal() {},

  closeModal: function closeModal() {
    this.props.onClose();
  },

  okModal: function okModal() {
    this.props.onClose();
  },

  componentWillReceiveProps: function componentWillReceiveProps() {
    var modelJson = clooca.getModelInterface().getModelJSON();
    this.setState({
      modelJson: JSON.stringify(modelJson.data, null, 2)
    });
  },

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
          'h2',
          null,
          'エクスポート'
        ),
        React.createElement(
          'div',
          { className: 'core-modal-form' },
          React.createElement('textarea', { value: this.state.modelJson })
        ),
        React.createElement(
          'button',
          { onClick: this.okModal },
          'OK'
        ),
        React.createElement(
          'button',
          { onClick: this.closeModal },
          'Cancel'
        )
      )
    );
  }
});

module.exports = ExportJSONModal;
//# sourceMappingURL=exportJSON.js.map
