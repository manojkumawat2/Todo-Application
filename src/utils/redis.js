const Redis = require('ioredis');

const redisUrl = process.env.REDISURL ?? 'redis://localhost:6379';

const redis = new Redis(redisUrl);

const setValue = async (key, value) => {
    return redis.set(key, value);
}

const getValue = async (key) => {
    const value = redis.get(key);
    return Promise.resolve(value);
}

module.exports = {
    redis,
    setValue,
    getValue,
};