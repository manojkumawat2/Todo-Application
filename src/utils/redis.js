const Redis = require('ioredis');

const redis = new Redis({
    host: "localhost",
    port: 6379,
});

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