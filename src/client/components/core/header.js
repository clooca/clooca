var React = require('react');
var Menu = require('../menu');
var MenuItem = require('../menu/item');
var AddTabModal = require('../modal/addTab');
var TabAction = require('../../actions/tab');

let Header = React.createClass({

  getInitialState: function () {
    return {
      isOpenAddTabModal: false
    };
  },

  componentWillMount: function() {
  	var setState = this.setState.bind(this);
    
  },

  componentDidMount: function () {
  },

  componentDidUpdate: function () {
  },

  componentWillUnmount : function() {
  },

  addTab: function(newTab) {
    TabAction.add(newTab);
  },

  onAddTabMenuSelected: function() {
    this.setState({
      isOpenAddTabModal: true
    });
  },

  onCloseAddTabModal: function() {
    this.setState({
      isOpenAddTabModal: false
    });
  },

  render: function () {
    return (
    	<div style={{height:"32px", "border-bottom":"solid 1px #333", margin: "6px"}}>
    		<div style={{float:"left"}}>
	    		<div>clooca</div>
    		</div>
    		<div style={{float:"left", "margin-left":"30px"}}>
    			<Menu>
            <MenuItem title="タブを追加" onSelect={this.onAddTabMenuSelected}></MenuItem>
          </Menu>
    		</div>
        <div style={{overflow:'hidden', clear:'both'}}></div>
          <AddTabModal isOpen={this.state.isOpenAddTabModal} onOk={this.addTab} onClose={this.onCloseAddTabModal} pluginNames={this.props.pluginNames}></AddTabModal>
    	</div>
    );
  }
});

module.exports = Header;