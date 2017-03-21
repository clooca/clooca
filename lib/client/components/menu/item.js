"use strict";

var React = require('react');

var MenuItem = React.createClass({
  displayName: "MenuItem",


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
      "li",
      { className: "core-header-menuitem", onClick: this.props.onSelect },
      this.props.children
    );
  }
});

module.exports = MenuItem;
//# sourceMappingURL=item.js.map
