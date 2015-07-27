# dat-rest-server

A rest server for [dat](http://dat-data.com). Parameters to all functions are the same as are expected in the [cli documentation](https://github.com/maxogden/dat/blob/master/docs/cli-docs.md).

```
npm install -g dat-rest-server
dat-rest-server --port=<port> --path=<path/to/dat>
```

## clone

Clone dat.

```
dat clone mydat.com
```

## GET datasets list

```
GET mydat.com/datasets
```

Returns
```
[
  "files",
  "sac-crime",
  "models"
]
```


## GET datasets

Gets dat data out.

Optional params: `format`

```
GET mydat.com/datasets/<dataset>?format=csv
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


## POST datasets

Put data in dat.

Optional params: `message`, `format`, `key`.

```
POST mydat.com/datasets/<dataset>
```

Be sure to push data in the request with an appropriate `Content-Type` header:

```
'json': 'application/json',
'csv': 'text/csv',
'ndjson': 'application/x-ndjson',
'sse': 'text/event-stream'
```