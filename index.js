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
  function regexRename(file, unused, cb) {
    if (file.isStream()) {
      return cb(new PluginError(
        myName,
        'Streaming not supported'
      ))
    }
    if (
      typeof regex !== 'string' ||
      typeof str !== 'string'
    ) { return cb(new PluginError(
          myName,
          'Parameters must be strings'
        ))
      }
    if (file.isBuffer()) {
      try {
        file.path = path.join(
          file.base,
          file.relative.replace(regex, str)
        )
      } catch(err) {
        return cb(new PluginError(myName, err))
      }
    }
    cb(null, file)
  }
  return through.obj(regexRename)
}
