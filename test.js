const test = require('micro-analytics-adapter-utils/unit-tests');
const path = require('path');

const adapter = require('./index');

const dbConfig = process.env.MAA_REDIS_DB_CONFIG || 'redis://localhost:6379';
const hashKey = process.env.MAA_REDIS_HASH_KEY || 'micro-analytics';

test({
  name: 'redis',
  modulePath: path.resolve(__dirname, './index.js'),
  beforeEach: async () => {
    adapter.init({ dbConfig, hashKey });
    await adapter.clear();
  },
  afterEach: () => {
    return adapter.close();
  }
});
