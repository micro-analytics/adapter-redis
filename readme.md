# micro-analytics-adapter-redis

This is an [Redis][] adapter for [micro-analytics][] that uses [redis hashes][] to store
the data.

## Usage

```
npm install micro-analytics-cli micro-analytics-adapter-redis
micro-analytics --adapter redis
```

and open [localhost:3000](https://localhost:3000).

[Redis]: https://redis.io
[micro-analytics]: https://github.com/micro-analytics
[redis hashes]: https://redis.io/topics/data-types#hashes

## Configuration

### Database config `--db-config`

This adapter allows you to provide a database configuration string
with the option `--db-config` or an environment variable `MAA_REDIS_DB_CONFIG`
in the form of either a JSON string or a plaintext connection string which will
be provided to the ioredis' (constructor). Here are two examples:

Either provide a JSON string

```
micro-analytics --adapter redis --db-config '{"host":"myhost.cloud.redislabs.com","port":16244}'
```

or a dsn-like connection string

```
micro-analytics --adapter redis --db-config myhost.cloud.redislabs.com:16244
```

### Hash key `--hash-key`

This adapter uses redis hashes to store the analytics data. The key
of the hash can be configured with the `--hash-key` option or an
environment variable `MAA_REDIS_HASH_KEY`. The default value is
`micro-analytics`.
