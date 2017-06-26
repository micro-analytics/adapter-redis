const Redis = require('ioredis');
const escapeRegexp = require('escape-regex');
const { filterPaths, filterViews } = require('micro-analytics-adapter-utils');

const options = [
  {
    name: 'db-config',
    description: 'Redis connection string or ioredis compatible JSON object. Environment variable: MAA_REDIS_DB_CONFIG',
    defaultValue: process.env.MAA_REDIS_DB_CONFIG || 'redis://localhost:6379'
  },
  {
    name: 'hash-key',
    description: 'Hash key for the redis hash to store all the data in. Environment variable: MAA_REDIS_DB_CONFIG',
    defaultValue: process.env.MAA_REDIS_HASH_KEY || 'micro-analytics'
  }
];

let hashKey;
let redis;
function init(options) {
  let dbConfig;
  try {
    dbConfig = JSON.parse(options.dbConfig);
  } catch (e) {
    dbConfig = options.dbConfig;
  }
  hashKey = options.hashKey;
  redis = new Redis(dbConfig);
}

function get(key, options) {
  return redis
    .hget(hashKey, key)
    .then(value => JSON.parse(value))
    .then(value => ({ views: filterViews(value ? value.views : [], options) }));
}

function put(key, value) {
  return redis.hset(hashKey, key, JSON.stringify(value));
}

function getAll(options) {
  return redis.hgetall(hashKey).then(
    value => filterPaths(Object.keys(value), options).reduce((lastValue, item) => {
      const parsed = JSON.parse(value[item]);
      return Object.assign({}, lastValue, {
        [item]: Object.assign({}, parsed, { views: filterViews(parsed.views, options) })
      });
    }, {})
  );
}

function has(key) {
  return redis.hexists(hashKey, key).then(function(result) {
    return !!result;
  });
}

function keys() {
  return redis.hkeys(hashKey);
}

function close() {
  return redis.disconnect();
}

function clear() {
  return redis.flushdb();
}

module.exports = {
  clear: clear,
  close: close,
  get: get,
  getAll: getAll,
  has: has,
  init: init,
  keys: keys,
  options: options,
  put: put
};
