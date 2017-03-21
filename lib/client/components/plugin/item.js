"use strict";

var React = require('react');

var PluginItem = React.createClass({
  displayName: "PluginItem",


  getInitialState: function getInitialState() {
    return {};
  },

  componentWillMount: function componentWillMount() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  onClick: function onClick() {
    if (this.props.onClick) this.props.onClick(this.props.pluginName);
  },

  render: function render() {
    return React.createElement(
      "div",
      { className: "plugin-item", onClick: this.onClick },
      this.props.pluginName
    );
  }
});

module.exports = PluginItem;
//# sourceMappingURL=item.js.map
