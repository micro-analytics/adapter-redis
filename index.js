const Redis = require('ioredis');

const DB_CONFIG_RAW = process.env.MAA_REDIS_DB_CONFIG;

let DB_CONFIG;

if(DB_CONFIG_RAW) {
  try {
    DB_CONFIG = JSON.parse(DB_CONFIG_RAW);
  } catch(e) {
    DB_CONFIG = DB_CONFIG_RAW;
  }
}

const redis = new Redis(DB_CONFIG);

const HASH_KEY = process.env.MAA_REDIS_HASH_KEY || 'micro-analytics';

function get(key) {
  return redis.hget(HASH_KEY, key).then(value => JSON.parse(value));
}

function put(key, value) {
  return redis.hset(HASH_KEY, key, JSON.stringify(value));
}

function getAll(options) {
  return redis
    .hgetall(HASH_KEY)
    .then(
      value =>
        Object
          .keys(value)
          .reduce(
            (lastValue, item) => Object.assign({}, lastValue, { [item]: JSON.parse(value[item]) }),
            {}
          )
    );
}

function has(key) {
  return redis.hexists(HASH_KEY, key);
}

function keys() {
  return redis.hkeys(HASH_KEY);
}

module.exports = { get: get, put: put, has: has, keys: keys, getAll: getAll };
