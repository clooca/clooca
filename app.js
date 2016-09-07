var fs = require('fs');
var path = require('path');
var express = require('express');
var loader = require('./src/server/plugin/loader');
var ejs = require('ejs');

var app = express();
app.use('/', express.static( path.resolve(__dirname, "dist") ));
app.engine('ejs',ejs.renderFile);

app.listen(process.env.PORT || 3000);

//load plugins
var pluginPath = path.join(__dirname, "./plugins");



var plugins = loader.load(pluginPath);

app.get('/plugins', function(req, res) {
	res.json(plugins.map(function(plugin) {
		return plugin.name;
	}))
});

app.get('/plugins/:name/js', function(req, res) {
	var name = req.params.name;
	var target = plugins.filter(function(plugin) {
		return plugin.name == name;
	})[0];
	fs.readFile(path.join(target.path, "bundle.js"), function(err, data) {
		res.setHeader('Content-Type', 'text/script')
		res.send(data);
	});
});

app.get('/plugins/:name/css', function(req, res) {
	var name = req.params.name;
	var target = plugins.filter(function(plugin) {
		return plugin.name == name;
	})[0];
	fs.readFile(path.join(target.path, "style.css"), function(err, data) {
		res.setHeader('Content-Type', 'text/css')
		res.send(data);
	});
});

app.get('/plugins/:name/html', function(req, res) {
	var name = req.params.name;
	res.render('plugin.ejs', {
		name: name
	})
});
