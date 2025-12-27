# Config Object


## Dobo's connection object

These connection objects should be used as your **Dobo connection** object's array written in your ```{dataDir}/config/dobo.json```, NOT in ```{dataDir}/config/doboPostgresql.json```.

| Key Name | Type | Default | Description |
| ------- | ---- | ----- | ----------- |
| ```name``` | ```string``` | ```default``` | Connection name |
| ```driver``` | ```string``` || Driver's type. See below  |
| ```host``` | ```string``` || Hostname. Defaults to ```127.0.0.1``` |
| ```port``` | ```number``` || Port |
| ```user``` | ```string``` || Username |
| ```password``` | ```string``` || Password |
| ```database``` | ```string``` || Database |

Allowed database driver's type:

| Driver | Default port |
| ------ | ------------ |
| ```doboPostgresql``` | ```5432``` |
| ```doboPostgresql:cockrouchdb``` | ```26257``` |
| ```doboPostgresql:redshift``` | ```5439``` |
