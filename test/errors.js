// test/errors.js
////////////////////////////////////////////////////////////
// NPM Modules
////////////////////////////////////////////////////////////
var assert = require('chai').assert
var Vinyl   = require('vinyl')
var path   = require('path')
var fs     = require('fs')

////////////////////////////////////////////////////////////
// Local Modules
////////////////////////////////////////////////////////////
var rename = require('../')

////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////
describe('errors', function() {
  it('should emit error if file is a stream', function(done) {
    var stream = rename()
    var error
    stream.on('error', function(err) {
      error = err.message
    })
    var file = new Vinyl({
      // grabs index.js but any file will do
      contents: fs.createReadStream('../')
    })
    stream.write(file)
    assert.equal(error, 'Streaming not supported')
    done()
  })
  it('should emit error if passed incorrect params', function(done) {
    // var stream = rename('param', 'param') // wouldn't error
    var stream = rename()
    var error
    stream.on('error', function(err) {
      error = err.message
    })
    stream.write(new Vinyl())
    assert.equal(error, 'Incorrect params')
    done()
  })
})
