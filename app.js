#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var nopt = require("nopt");
var express = require('express');
var loader = require('./src/server/core/pluginLoader');
var ejs = require('ejs');

var loadSettings = require('./src/server/core/settingsLoader');


var knownOpts = {
    "settings":[path],
    "plugin":[path],
    "port": Number,
    "help": Boolean
};
var shortHands = {
    "s":["--settings"],
    "pl":["--plugin"],
    "p":["--port"],
    "?":["--help"]
};

nopt.invalidHandler = function(k,v,t) {
}

var parsedArgs = nopt(knownOpts,shortHands,process.argv,2)

var settings = loadSettings(parsedArgs);

//load plugins
var pluginPath = parsedArgs.plugin || settings.pluginPath || path.join(settings.userDir, "./plugins");
var plugins = loader.load(pluginPath);
var corePlugins = loader.load(path.resolve(__dirname, './plugins'));
plugins = plugins.concat(corePlugins);

var app = express();
app.use('/', express.static( path.resolve(__dirname, "dist") ));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',ejs.renderFile);

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

app.listen(process.env.PORT || 3000);

