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


var CreateModal = React.createClass({

  getInitialState: function() {
    return {
    	containmentNames: [],
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
	var model = this.props.model;
  	var association = this.refs.association.value;
  	var name = this.refs.name.value;
  	model.get(association).add(model.eClass.create({name:name}));
  	this.props.onClose();
  },

  componentWillReceiveProps: function() {
	var model = this.props.model;
	var containmentNames = model.eClass.get('eAllContainments').map(function(asso) {
		return asso.get('name');
	});
	this.setState({
		containmentNames: containmentNames
	});
  },

  render: function() {
  	var options = this.state.containmentNames.map(function(name) {
  		return (<option>{name}</option>);
  	});
    return (
      <div>
        <Modal
          isOpen={this.props.isOpenCreateModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">インスタンス作成</h2>
          <select ref="association">{options}</select>
          <input ref="name" type="text" />
          <button onClick={this.okModal}>OK</button>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    );
  }
});

module.exports = CreateModal;