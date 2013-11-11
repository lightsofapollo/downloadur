/**
Top level test fixtures used by all other tests. Handles details like what
server we are hitting and some grunt work like getting the sha1 to verify
that we download sane things.
*/

var fsPath = require('path'),
    url = require('url'),
    http = require('http');

var DEFAULTS = Object.freeze({
  url: 'http://localhost:60107'
});

var options = module.exports.options = DEFAULTS;


/**
Get the sha1 of a given file by downloading it from the expected path.
This will break in bad ways unless the vagrant server is used.

@param {String} path for binary (not sha1)
@param {Function} callback for sha1 [Error, String]
*/
module.exports.sha1 = function(path, callback) {
  http.get(module.exports.url(path) + '.sha1', function(res) {
    var buffer;
    res.on('data', function(content) {
      buffer = buffer || content;
      buffer += content;
    });

    res.once('error', callback);

    res.once('end', function() {
      var sha1 = buffer.split(' ').shift().trim();
      callback(null, sha1);
    });
  });
};

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
};
