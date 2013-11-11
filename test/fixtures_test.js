suite('fixtures', function() {
  var http = require('superagent'),
      fixtures = require('./fixtures'),
      sha1sumPath = 'firefox.tar.bz2.sha1';

  test('.url', function() {
    var output = fixtures.url(sha1sumPath);

    assert(output);
    assert.include(output, sha1sumPath);
    assert.include(output, fixtures.options.url);
  });

  suite('sha1', function() {
    var expected,
        binary = 'firefox.tar.bz2';

    //setup(function(done) {
    //});

    test('', function() {
    });
  });
});
