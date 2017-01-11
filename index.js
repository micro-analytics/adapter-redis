var Redis = require('ioredis');

var redis = new Redis();

var HASH_KEY = 'micro-analytics';

function get(key) {
  return redis.hget(HASH_KEY, key);
}

function put(key, value) {
  return redis.hset(HASH_KEY, key, value);
}

function getAll(options) {
  return redis.hgetall(HASH_KEY);
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
