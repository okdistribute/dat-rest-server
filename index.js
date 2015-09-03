var openDat = require('dat/lib/util/open-dat.js')
var http = require('http')
var getport = require('getport')

var createRouter = require('./router.js')

module.exports = function (args, cb) {
  if (args.port) return serve(parseInt(args.port, 10))
  if (!args.path) args.path = '.'

  getport(6442, function (err, port) {
    if (err) throw err
    return serve(port)
  })


  function serve (port) {
    var router = createRouter()

    openDat(args, function (err, db) {
      if (err) throw err
      if (!port) throw new Error('Invalid port: ' + port)

      console.log('Listening on port ' + port)

      var server = http.createServer(function (req, res) {
        try {
          router(req, res, {db: db}, onError)
        } catch (err) {
          onError(err)
        }

        function onError (err) {
          res.statusCode = err.statusCode || 500;
          res.end(err.message);
        }
      })

      server.on('connection', function (socket) {
        socket.setNoDelay(true) // http://neophob.com/2013/09/rpc-calls-and-mysterious-40ms-delay/
      })

      // keep connections open for a long time (for e.g. --live)
      server.setTimeout(86400)

      server.listen(port)
      cb(server, port)
    })
  }
}