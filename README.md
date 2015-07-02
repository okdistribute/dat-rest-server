# dat-rest-server

A rest server for [dat](http://dat-data.com). Parameters to all functions are the same as are expected in the [cli documentation](https://github.com/maxogden/dat/blob/master/docs/cli-docs.md)

## export

Gets data out of dat.

```
GET /export?dataset=<dataset-name>&format=<csv/ndjson>
```

## import

Put tabular data in dat.

```
POST /import
{
 "dataset": <dataset-name>,
 "message": <message>,
 "format": <csv/ndjson>
}
```