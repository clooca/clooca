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

var ImportJSONModal = React.createClass({
  displayName: 'ImportJSONModal',


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
    var _this = this;

    var url = this.refs.url.value;
    var modelInterface = clooca.getModelInterface();
    var uri = modelInterface.getCurrentModel().get('uri');
    clooca.getCC().request('clooca', 'findEcoreModel', { url: url }).then(function (model) {
      return modelInterface.loadModel(uri, model);
    }).then(function () {
      _this.props.onClose();
    });
  },

  componentWillReceiveProps: function componentWillReceiveProps() {},

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
          'インポート'
        ),
        React.createElement(
          'div',
          { className: 'core-modal-form' },
          React.createElement(
            'span',
            { className: 'core-modal-form-label' },
            'URL'
          ),
          React.createElement(
            'div',
            { className: 'core-modal-form-input' },
            React.createElement('input', { ref: 'url', type: 'text' })
          )
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

module.exports = ImportJSONModal;
//# sourceMappingURL=importJSON.js.map
