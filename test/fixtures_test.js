suite('fixtures', function() {
  var http = require('superagent'),
      fixtures = require('./fixtures'),
      binary = 'firefox.tar.bz2',
      sha1sumPath = binary + '.sha1';

  test('.url', function() {
    var output = fixtures.url(sha1sumPath);

    assert(output);
    assert.include(output, sha1sumPath);
    assert.include(output, fixtures.options.url);
  });

  suite('sha1', function() {
    var expected;

    setup(function(done) {
      http.get(fixtures.url(sha1sumPath), function(res) {
        var buffer;
        res.on('data', function(content) {
          buffer = buffer || content;
          buffer += content;
        });

        res.once('error', done);

        res.on('end', function() {
          expected = buffer.split(' ').shift().trim();
          assert(expected, 'fixture sha1 is available');
          assert.equal(typeof expected, 'string', 'sha1 is a string');
          assert(expected.length > 0, 'has a length');
          done();
        });
      });
    });

    test('sha1', function(done) {
      fixtures.sha1(binary, function(err, sha1) {
        if (err) return done(err);
        assert.equal(expected, sha1);
        done();
      });
    });
  });
});
