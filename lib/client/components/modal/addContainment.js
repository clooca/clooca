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
      containments: [],
      selectedContainment: null,
      modalIsOpen: false
    };
  },

  afterOpenModal: function afterOpenModal() {},

  closeModal: function closeModal() {
    this.props.onClose();
  },

  okModal: function okModal() {
    var model = this.props.model;
    var resourceSet = this.props.resourceSet;
    var association = this.refs.association.value;
    var eclass = this.refs.eclass.value;
    var name = this.refs.name.value;
    var eClass = resourceSet.elements('EClass').filter(function (eClass) {
      return eClass.get('name') == eclass;
    })[0];
    model.get(association).add(eClass.create({ name: name }));
    this.props.onClose();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var model = nextProps.model;
    if (!model) return;
    var resourceSet = nextProps.resourceSet;
    var containments = model.eClass.get('eAllContainments').map(function (asso) {
      var eType = asso.get('eType');
      if (eType.get('abstract') || eType.get('interface')) {
        var superTypes = resourceSet.elements('EClass').filter(function (eClass) {
          return eClass.get('eSuperTypes').filter(function (eSuperType) {
            return eType.get('name') == eSuperType.get('name');
          }).length > 0;
        });
        var superTypeNames = superTypes.map(function (superType) {
          return superType.get('name');
        });
        return {
          name: asso.get('name'),
          eTypes: superTypeNames
        };
      } else {
        return {
          name: asso.get('name'),
          eTypes: [eType.get('name')]
        };
      }
    });
    this.setState({
      containments: containments,
      selectedContainment: containments[0].name
    });
  },

  onAssociationChange: function onAssociationChange() {
    var association = this.refs.association.value;
    var selectedContainment = association;
    this.setState({
      selectedContainment: selectedContainment
    });
  },

  render: function render() {
    var _this = this;

    var options = this.state.containments.map(function (containment) {
      return React.createElement(
        'option',
        { key: 'createmodal-' + containment.name },
        containment.name
      );
    });
    var containment = this.state.containments.filter(function (containment) {
      return containment.name == _this.state.selectedContainment;
    })[0];
    var options2 = containment ? containment.eTypes.map(function (eTypeName) {
      return React.createElement(
        'option',
        { key: 'createmodal-' + eTypeName },
        eTypeName
      );
    }) : React.createElement('div', null);

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
            '関連名'
          ),
          React.createElement(
            'div',
            { className: 'core-modal-form-input' },
            React.createElement(
              'select',
              { ref: 'association', onChange: this.onAssociationChange },
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
            'クラス名'
          ),
          React.createElement(
            'div',
            { className: 'core-modal-form-input' },
            React.createElement(
              'select',
              { ref: 'eclass', onChange: this.onAssociationChange },
              options2
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
//# sourceMappingURL=addContainment.js.map
