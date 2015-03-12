// index.js
////////////////////////////////////////////////////////////
// NPM Modules
////////////////////////////////////////////////////////////
var path = require('path')
var PluginError = require('gulp-util').PluginError
var through = require('through2')

////////////////////////////////////////////////////////////
// Setup
////////////////////////////////////////////////////////////
var myName = 'gulp-regex-rename'

////////////////////////////////////////////////////////////
// Logic
////////////////////////////////////////////////////////////
module.exports = function(regex, str) {
  return through.obj(function(file, unused, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(
        myName,
        'Streaming not supported'
      ))
      return cb()
    }
    if ( regex instanceof RegExp === false ||
      typeof str !== 'string'
    ) {
      this.emit('error', new PluginError(
        myName,
        'Incorrect params'
      ))
      return cb()
      }
    try {
      file.path = path.join(
        file.base,
        file.relative.replace(regex, str)
      )
    } catch(err) {
      this.emit('error', new PluginError(myName, err))
      return cb()
    }
    return cb(null, file)
  })
}
