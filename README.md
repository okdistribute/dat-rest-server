# dat-rest-server

A rest server for [dat](http://dat-data.com). Parameters to all functions are the same as are expected in the [cli documentation](https://github.com/maxogden/dat/blob/master/docs/cli-docs.md).

```
npm install -g dat-rest-server
dat-rest-server --port=<port> --path=<path/to/dat>
```

## clone

Clone dat.

```
dat clone mydat.place
```

## export

Gets dat data out.

Optional params: `format`

```
GET mydat.place/export/<dataset>
```

## import

Put data in dat.

Optional params: `message`, `format`, `key`.

```
POST mydat.place/import/<dataset>
```

Be sure to push data in the request with an appropriate `Content-Type` header:

```
'json': 'application/json',
'csv': 'text/csv',
'ndjson': 'application/x-ndjson',
'sse': 'text/event-stream'
```