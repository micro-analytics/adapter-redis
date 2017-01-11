var Redis = require('ioredis');

var redis = new Redis();

var HASH_KEY = 'micro-analytics';

function get(key) {
  return redis.hget(HASH_KEY, key)
    .then((value) => JSON.parse(value));
}

function put(key, value) {
  return redis.hset(HASH_KEY, key, JSON.stringify(value));
}

function getAll(options) {
  return redis.hgetall(HASH_KEY)
    .then((value) =>
      Object.keys(value)
      .reduce((lastValue, item) =>
        Object.assign(
          {},
          lastValue,
          { [item]: JSON.parse(value[item])}
        )
      )
    );
}

function has(key) {
  return redis.hexists(HASH_KEY, key);
}

module.exports = {
  get: get,
  put: put,
  has: has,
  getAll: getAll,
}
