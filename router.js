var Router = require('http-hash-router')
var fs = require('fs')
var path = require('path')
var debug = require('debug')('dat-rest-server')
var pump = require('pump')
var ndjson = require('ndjson')
var url = require('url')
var createExportStream = require('dat/lib/export.js')
var createImportStream = require('dat/lib/import.js')
var listFilesStream = require('dat/lib/files.js')
var route = require('dat/lib/serve.js')

module.exports = function createRouter () {
  var router = Router()

  router.set('/', function (req, res, opts, cb) {
    if (req.method === 'GET') {
      route.information(opts.db, opts, function (err, data) {
        if (err) return res.end(err)
        res.setHeader('content-type', 'application/json')
        res.end(data)
      })
    } else if (req.method === 'POST') {
      return pump(req, route.replication(opts.db, opts), res)
    } else {
      res.statuscode = 405
      res.end()
    }
  })

  router.set('/health', function (req, res, opts, cb) {
    var response = fs.readFileSync(path.join(__dirname, 'index.html')).toString()
    res.end(response)
  })

  router.set('/changes', function (req, res, opts, cb) {
    var args = argparse(req)
    args.values = true
    return pump(opts.db.createChangesStream(args), ndjson.serialize(), res, function (err) {
      if (err) throw err
    })
  })

  router.set('/files', function (req, res, opts, cb) {
    var limit = opts.limit
    if (limit) {
      if (opts.limit) opts.limit = parseInt(limit, 10)
    }
    opts.dataset = opts.dataset || 'files'
    opts.json = true

    var filesStream = listFilesStream(opts.db, opts)
    return pump(filesStream, res, function (err) {
      if (err) throw err
    })
  })

  router.set('/files/:key', function (req, res, opts, cb) {
    opts.dataset = opts.dataset || 'files'
    if (req.method === 'GET') {
      var reader = opts.db.createFileReadStream(opts.params.key, opts)
      pump(reader, res)
    } else res.end('POST not supported yet.')
  })

  router.set('/datasets', function (req, res, opts, cb) {
    opts.db.listDatasets(function (err, datasets) {
      if (err) abort(err, args)
      res.end(JSON.stringify(datasets))
    })
  })

  router.set('/datasets/:dataset', function (req, res, opts, cb) {
    var args = argparse(req)
    args.dataset = opts.params.dataset
    if (!args.format) args.format = 'ndjson'

    if (req.method === 'GET') return pump(createExportStream(opts.db, args), res)
    else return pump(req, createImportStream(opts.db, args), function done (err) {
      if (err) return cb(err)
      res.end(opts.db.head)
    })
  })

  return router
}

function argparse (req) {
  var parsedUrl = url.parse(req.url, true);
  return parsedUrl.query
}
