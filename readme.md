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

### Hash key

This adapter uses redis hashes to store the analytics data. The key
of the hash can be configured with the environment variable
`MAA_REDIS_HASH_KEY`. The default value is `micro-analytics`.
