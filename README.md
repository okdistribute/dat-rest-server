# dat-rest-server

A http server for [dat](http://dat-data.com). Parameters to routes are the same as the [cli documentation](https://github.com/maxogden/dat/blob/master/docs/cli-docs.md).

```
npm install -g dat-rest-server
dat-rest-server --port=<port> --path=<path/to/dat>
```

## POST /

```
dat clone mydatserver.com
```

## GET /datasets

```
GET mydatserver.com/datasets
```

Returns
```
[
  "files",
  "sac-crime",
  "models"
]
```

## GET /changes

Gets changes from dat

Optional params: `live`

```
GET mydatserver.com/changes?live=true
```

Returns

```
"root":true,"change":1,"date":"2015-09-01T20:47:40.582Z","version":"3ffbf6b75e57a934024c47e747390732bb0b8210310b037bb4974b5529820ea9","message":"","links":[],"puts":0,"deletes":0,"files":0}
{"root":false,"change":2,"date":"2015-09-01T20:47:40.590Z","version":"dbf404f13567d5dd727534b80816b1b95211523611410024bafb53a3831f0f18","message":"","links":["3ffbf6b75e57a934024c47e747390732bb0b8210310b037bb4974b5529820ea9"],"puts":1,"deletes":0,"files":1}
{"root":false,"change":3,"date":"2015-09-01T20:47:45.274Z","version":"969be9bd7e4670633e1b8412f9617311c80b6e3aec6d6013de15b705292fcb28","message":"","links":["dbf404f13567d5dd727534b80816b1b95211523611410024bafb53a3831f0f18"],"puts":1342,"deletes":0,"files":0}
{"root":false,"change":4,"date":"2015-09-01T22:52:45.479Z","version":"2e8cd3a9578e9a5281768d8a7625adc2c7e99d60660fde5a8807205240d89601","message":"","links":["969be9bd7e4670633e1b8412f9617311c80b6e3aec6d6013de15b705292fcb28"],"puts":1,"deletes":0,"files":1}
{"root":false,"change":5,"date":"2015-09-01T22:53:17.775Z","version":"a2c77bedfb59f2237825614b57109ef35e097f5b1bf9320e9a52ef90768d566a","message":"complete->completed","links":["2e8cd3a9578e9a5281768d8a7625adc2c7e99d60660fde5a8807205240d89601"],"puts":1342,"deletes":0,"files":0}
```

## GET /datasets/:dataset

Gets dat data out.

Optional params: `format`

```
GET mydatserver.com/datasets/<dataset>?format=csv
```

Returns
```
cdatetime,address,district,beat,grid,crimedescr,ucr_ncic_code,latitude,longitude
1/1/06 0:00,3108 OCCIDENTAL DR,3,3C        ,1115,10851(A)VC TAKE VEH W/O OWNER,2404,38.55042047,-121.3914158
1/1/06 0:00,2082 EXPEDITION WAY,5,5A        ,1512,459 PC  BURGLARY RESIDENCE,2204,38.47350069,-121.4901858
1/1/06 0:00,4 PALEN CT,2,2A        ,212,10851(A)VC TAKE VEH W/O OWNER,2404,38.65784584,-121.4621009
1/1/06 0:00,22 BECKFORD CT,6,6C        ,1443,476 PC PASS FICTICIOUS CHECK,2501,38.50677377,-121.4269508
1/1/06 0:00,3421 AUBURN BLVD,2,2A        ,508,459 PC  BURGLARY-UNSPECIFIED,2299,38.6374478,-121.3846125
1/1/06 0:00,5301 BONNIEMAE WAY,6,6B        ,1084,530.5 PC USE PERSONAL ID INFO,2604,38.52697863,-121.4513383
1/1/06 0:00,2217 16TH AVE,4,4A        ,957,459 PC  BURGLARY VEHICLE,2299,38.537173,-121.4875774
1/1/06 0:00,3547 P ST,3,3C        ,853,484 PC   PETTY THEFT/INSIDE,2308,38.56433456,-121.4618826
1/1/06 0:00,3421 AUBURN BLVD,2,2A        ,508,459 PC  BURGLARY BUSINESS,2203,38.6374478,-121.3846125
1/1/06 0:00,1326 HELMSMAN WAY,1,1B        ,444,1708 US   THEFT OF MAIL,2310,38.60960217,-121.4918375
```


## POST /datasets/:dataset

Put data in dat.

Optional params: `message`, `format`, `key`.

```
POST mydatserver.com/datasets/<dataset>
```

Be sure to push data in the request with an appropriate `Content-Type` header:

```
'json': 'application/json',
'csv': 'text/csv',
'ndjson': 'application/x-ndjson',
'sse': 'text/event-stream'
```

