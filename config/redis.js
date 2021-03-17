require("dotenv").config();
let defaultConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
};

if (process.env.REDISCLOUD_URL) {
    defaultConfig = process.env.REDISCLOUD_URL;
}
module.exports = defaultConfig;