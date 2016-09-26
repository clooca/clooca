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


var ImportJSONModal = React.createClass({

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
  	var url = this.refs.url.value;
  	var modelInterface = clooca.getModelInterface();
  	var uri = modelInterface.getCurrentModel().get('uri');
    clooca.getCC().request('clooca', 'findEcoreModel', {url: url}).then((model)=>{
    	return modelInterface.loadModel( uri, model );
    }).then(()=>{
	  	this.props.onClose();
	});
  },

  componentWillReceiveProps: function() {
  },

  render: function() {
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2>インポート</h2>

          <div className="core-modal-form">
            <span className="core-modal-form-label">URL</span>
            <div className="core-modal-form-input">
              <input ref="url" type="text" />
            </div>
          </div>
          <button onClick={this.okModal}>OK</button>
          <button onClick={this.closeModal}>Cancel</button>
        </Modal>
      </div>
    );
  }
});

module.exports = ImportJSONModal;