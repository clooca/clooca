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

var AddTabModal = React.createClass({
  displayName: 'AddTabModal',


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
    var title = this.refs.title.value;
    var pluginName = this.refs.plugins.value;
    this.props.onOk({ title: title, plugin: pluginName });
    this.props.onClose();
  },

  componentWillReceiveProps: function componentWillReceiveProps() {},

  render: function render() {
    var options = this.props.pluginNames.map(function (name) {
      return React.createElement(
        'option',
        { key: 'addtab-' + name },
        name
      );
    });
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
          'タブの追加'
        ),
        React.createElement(
          'div',
          { className: 'core-modal-form' },
          React.createElement(
            'span',
            { className: 'core-modal-form-label' },
            'プラグイン'
          ),
          React.createElement(
            'div',
            { className: 'core-modal-form-input' },
            React.createElement(
              'select',
              { ref: 'plugins' },
              options
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'core-modal-form' },
          React.createElement(
            'span',
            { className: 'core-modal-form-label' },
            '作成するタブの名前'
          ),
          React.createElement(
            'div',
            { className: 'core-modal-form-input' },
            React.createElement('input', { ref: 'title', type: 'text' })
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

module.exports = AddTabModal;
//# sourceMappingURL=addTab.js.map
