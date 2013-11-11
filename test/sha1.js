var crypto = require('crypto');
var fs = require('fs');

/**
Taken from the nodejs docs on Cypto.

@param {ReadableStream} stream (must not be flowing).
@param {Function} callback [Error, String sha1]
*/
function sha1(stream, callback) {
  var shasum = crypto.createHash('sha1');
  stream.on('data', function(d) {
    shasum.update(d);
  });

  stream.once('error', callback);
  stream.once('end', function() {
    callback(null, shasum.digest('hex'));
  });
}

module.exports = sha1;
