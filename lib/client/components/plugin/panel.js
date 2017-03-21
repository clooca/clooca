"use strict";

var React = require('react');

var Panel = React.createClass({
  displayName: "Panel",


  getInitialState: function getInitialState() {
    return {
      tabItems: []
    };
  },

  componentWillMount: function componentWillMount() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  render: function render() {
    return React.createElement("iframe", { className: "core-iframe", src: "/plugins/" + this.props.plugin + "/html" });
  }
});

module.exports = Panel;
//# sourceMappingURL=panel.js.map
