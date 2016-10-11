var React = require('react');
var Codemirror = require('react-codemirror');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/htmlembedded/htmlembedded');

var TemplateEditor = React.createClass({
    getInitialState: function() {
        return {
            code: "// Code"
        };
    },
    updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
    },
    render: function() {
        var options = {
            lineNumbers: true,
            mode: 'application/x-ejs'
        };
        return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
    }
});

module.exports = TemplateEditor;