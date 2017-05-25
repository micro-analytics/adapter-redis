const Redis = require('ioredis');
const escapeRegexp = require('escape-regex');

const DB_CONFIG_RAW = process.env.MAA_REDIS_DB_CONFIG;

let DB_CONFIG;

if (DB_CONFIG_RAW) {
  try {
    DB_CONFIG = JSON.parse(DB_CONFIG_RAW);
  } catch (e) {
    DB_CONFIG = DB_CONFIG_RAW;
  }
}

const redis = new Redis(DB_CONFIG);

const HASH_KEY = process.env.MAA_REDIS_HASH_KEY || 'micro-analytics';

function keyRegex(str) {
  str = str.split('*').map(s => escapeRegexp(s)).join('*');
  return new RegExp('^' + str.replace('*', '.*'));
}

function filterPaths(options) {
  return key =>
    options.ignoreWildcard
      ? key.startsWith(options.pathname)
      : key.match(keyRegex(options.pathname));
}

function filterViews(views, options) {
  return (views || []).filter(view => {
    if (options && options.before && view.time > options.before)
      return false;
    if (options && options.after && view.time < options.after)
      return false;
    return true;
  });
}

function get(key, options) {
  return redis
    .hget(HASH_KEY, key)
    .then(value => JSON.parse(value))
    .then(value => ({ views: filterViews(value ? value.views : [], options) }));
}

function put(key, value) {
  return redis.hset(HASH_KEY, key, JSON.stringify(value));
}

function getAll(options) {
  return redis.hgetall(HASH_KEY).then(
    value => Object.keys(value).filter(filterPaths(options)).reduce((lastValue, item) => {
      const parsed = JSON.parse(value[item]);
      return Object.assign({}, lastValue, {
        [item]: Object.assign({}, parsed, { views: filterViews(parsed.views, options) })
      });
    }, {})
  );
}

function has(key) {
  return redis.hexists(HASH_KEY, key).then(function(result) {
    return !!result;
  });
}

function keys() {
  return redis.hkeys(HASH_KEY);
}

function close() {
  return redis.disconnect();
}

module.exports = { get: get, put: put, has: has, keys: keys, getAll: getAll, close: close };
