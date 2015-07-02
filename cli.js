var args = require('minimist')(process.argv.slice(2))
var server = require('./')

server(args)

function usage () {
  console.log('dat-rest-server --port=<port-num> --path=<path/to/dat>')
}
