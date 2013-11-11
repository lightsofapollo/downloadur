var fsPath = require('path'),
    url = require('url');

var DEFAULTS = Object.freeze({
  url: 'http://localhost:60107'
});

var options = module.exports.options = DEFAULTS;

/**
Returns a url for a given path according to the current test fixture
configuration.

@param {String} path... multiple pieces to the path.
@return {String} fully qualified url.
*/
module.exports.url = function() {
  var parsed = url.parse(options.url);
  parsed.pathname = fsPath.join.apply(fsPath, arguments);

  return url.format(parsed);
}
