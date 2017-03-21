# micro-analytics-adapter-redis

This is an [Redis][] adapter for [micro-analytics][].

## Usage

```
npm install micro-analytics-cli micro-analytics-adapter-redis
DB_ADAPTER=redis micro-analytics
```

and open [localhost:3000](https://localhost:3000).

[Redis]: https://redis.io
[micro-analytics]: https://github.com/micro-analytics

## Configuration

### Database

This adapter allows you to provide a database configuration string
as an environment variable `MAA_REDIS_DB_CONFIG` in the form of
either a JSON string or a plaintext connection string which will
be provided to the ioredis' (constructor). Here are two examples:

Either provide a JSON string

```
DB_ADAPTER=redis MAA_REDIS_DB_CONFIG='{"host":"myhost.cloud.redislabs.com","port":16244}' micro-analytics
```

or a dsn-like connection string

```
DB_ADAPTER=redis MAA_REDIS_DB_CONFIG=myhost.cloud.redislabs.com:16244 micro-analytics
```

### Hash key

This adapter uses redis hashes to store the analytics data. The key
of the hash can be configured with the environment variable
`MAA_REDIS_HASH_KEY`. The default value is `micro-analytics`.
