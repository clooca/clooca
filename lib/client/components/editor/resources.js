'use strict';

var React = require('react');

var Resources = React.createClass({
  displayName: 'Resources',


  getInitialState: function getInitialState() {
    return {
      resources: []
    };
  },

  componentWillMount: function componentWillMount() {
    var setState = this.setState.bind(this);
  },

  componentDidMount: function componentDidMount() {},

  componentDidUpdate: function componentDidUpdate() {},

  componentWillUnmount: function componentWillUnmount() {},

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},

  onChange: function onChange(e) {
    var onSelect = this.props.onSelect;
    if (onSelect) {
      onSelect(e.target.value);
    }
  },

  summary: function summary(uri) {
    return uri.substr(0, 6) + '...' + uri.substr(uri.length - 12);
  },

  render: function render() {
    var _this = this;

    var loaded = clooca.getModelInterface().getLoadedList();
    var options = loaded.map(function (loaded) {
      return React.createElement(
        'option',
        { key: loaded.uri, value: loaded.uri },
        _this.summary(loaded.uri)
      );
    });
    return React.createElement(
      'select',
      { onChange: this.onChange },
      options
    );
  }
});

module.exports = Resources;
//# sourceMappingURL=resources.js.map
