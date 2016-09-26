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


var ExportJSONModal = React.createClass({

  getInitialState: function() {
    return {
    	eClassNames: [],
    	isOpen: false
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

  componentWillReceiveProps: function() {
    let modelJson = clooca.getModelInterface().getModelJSON();
    this.setState({
      modelJson: JSON.stringify(modelJson.data)
    });
  },

  render: function() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2>エクスポート</h2>

          <div className="core-modal-form">
            <textarea value={this.state.modelJson} />
          </div>
          <button onClick={this.okModal}>OK</button>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    );
  }
});

module.exports = ExportJSONModal;