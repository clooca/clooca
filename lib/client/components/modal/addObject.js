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
          'インスタンス作成'
        ),
        React.createElement(
          'div',
          { className: 'core-modal-form' },
          React.createElement(
            'span',
            { className: 'core-modal-form-label' },
            'クラス名'
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
            '作成するオブジェクトの名前'
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
