// tests/compiler.js
var fs = require('fs'),
    babel = require('babel-core'),
    path = require('path'),
    origJs = require.extensions['.js'];

require.extensions['.js'] = function(module, filename) {
  // optimization: external code never needs compilation.
  if (filename.indexOf('node_modules/') >= 0) {
    return (origJs || require.extensions['.js'])(module, filename);
  }
  var content = fs.readFileSync(filename, 'utf8');

  var compiled = babel.transform(content, {
    presets: ['es2015', 'react']
  });

  return module._compile(compiled.code, filename);
};
