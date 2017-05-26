const Redis = require('ioredis');
const test = require('micro-analytics-cli/adapter-tests/unit-tests');
const path = require('path');

const DB_CONFIG_RAW = process.env.MAA_REDIS_DB_CONFIG;

let DB_CONFIG;

if (DB_CONFIG_RAW) {
  try {
    DB_CONFIG = JSON.parse(DB_CONFIG_RAW);
  } catch (e) {
    DB_CONFIG = DB_CONFIG_RAW;
  }
}

const db = new Redis(DB_CONFIG);

const HASH_KEY = process.env.MAA_REDIS_HASH_KEY || 'micro-analytics';

test({
  name: 'redis',
  modulePath: path.resolve(__dirname, './index.js'),
  beforeEach: async () => {
    await db.flushall();
  },
  afterAll: async adapter => {
    await db.disconnect();
  }
});
