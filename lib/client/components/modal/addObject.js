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

var CreateModal = React.createClass({
  displayName: 'CreateModal',


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

    var resourceSet = clooca.getModelInterface().getResourceSet();
    var model = resourceSet.get('resources').filter(function (r) {
      return r.get('uri') == _this.props.uri;
    })[0];
    var name = this.refs.name.value;
    var eClassName = this.refs.eClass.value;
    var eClass = resourceSet.elements('EClass').filter(function (_eclass) {
      return _eclass.get('name') == eClassName;
    })[0];

    model.get('contents').add(eClass.create({ name: name }));
    clooca.getModelInterface().fireUpdate();
    this.props.onClose();
  },

  componentWillReceiveProps: function componentWillReceiveProps() {
    var resourceSet = clooca.getModelInterface().getResourceSet();
    var eClassNames = resourceSet.elements('EClass').map(function (_eclass) {
      return _eclass.get('name');
    });
    this.setState({
      eClassNames: eClassNames
    });
  },

  render: function render() {
    var options = this.state.eClassNames.map(function (eClassName) {
      return React.createElement(
        'option',
        { key: eClassName },
        eClassName
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
          '\u30A4\u30F3\u30B9\u30BF\u30F3\u30B9\u4F5C\u6210'
        ),
        React.createElement(
          'div',
          { className: 'core-modal-form' },
          React.createElement(
            'span',
            { className: 'core-modal-form-label' },
            '\u30AF\u30E9\u30B9\u540D'
          ),
          React.createElement(
            'div',
            { className: 'core-modal-form-input' },
            React.createElement(
              'select',
              { ref: 'eClass' },
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
            '\u4F5C\u6210\u3059\u308B\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u306E\u540D\u524D'
          ),
          React.createElement(
            'div',
            { className: 'core-modal-form-input' },
            React.createElement('input', { ref: 'name', type: 'text' })
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

module.exports = CreateModal;
//# sourceMappingURL=addObject.js.map
