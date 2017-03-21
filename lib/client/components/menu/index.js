"use strict";

var React = require('react');

var Menu = React.createClass({
  displayName: "Menu",


  getInitialState: function getInitialState() {
    return {};
  },

  componentWillMount: function componentWillMount() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  render: function render() {
    return React.createElement(
      "div",
      { className: "core-header-menu" },
      React.createElement(
        "ul",
        { style: { "listStyle": "none", "margin": 0, "padding": 0 } },
        this.props.children
      ),
      React.createElement("div", { style: { overflow: 'hidden', clear: 'both' } })
    );
  }
});

module.exports = Menu;
//# sourceMappingURL=index.js.map
