var Router = require('http-hash-router')
var fs = require('fs')
var path = require('path')
var pump = require('pump')
var url = require('url')
var createExportStream = require('dat/lib/export.js')
var createImportStream = require('dat/lib/import.js')

module.exports = function createRouter () {
  var router = Router()

  router.set('/', function (req, res, opts, cb) {
    pump(req, opts.readonly ? opts.db.push() : opts.db.replicate(), res)
  })

  router.set('/health', function (req, res, opts, cb) {
    var response = fs.readFileSync(path.join(__dirname, 'index.html')).toString()
    res.end(response)
  })

  router.set('/export', function (req, res, opts, cb) {
    var args = argparse(req)
    if (!args.format) args.format = 'ndjson'
    createExportStream(opts.db, args).pipe(res)
  })

  router.set('/import', function (req, res, opts, cb) {
    var args = argparse(req)
    pump(req, createImportStream(opts.db, args), function done (err) {
      if (err) return cb(err)
      res.end(db.head)
    })
  })

  return router
}

function argparse (req) {
  var parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl.query)
  return parsedUrl.query
}