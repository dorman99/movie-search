const config = require("../../../../config");
const redis = require("redis");
let redisClient
if(process.env.REDISCLOUD_URL){
    let redisURL = process.env.REDISCLOUD_URL;
    redisClient = redis.createClient(redisURL)
} else {
    redisClient = redis.createClient(config.redis)
}
const TTL = 15 * 60;
const _cacheKey = ({id}) => `movie:${id}`;


const searchDetail = async ({id}) => {
    const key = _cacheKey({id});
    return await getCache({key});
};


const getCache = async ({key}) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, reply) => {
            if (err) {
                return reject(err);
            } else if (reply) {
                return resolve(JSON.parse(reply));
            }
            return resolve(null);
        });
    })
}

const setCache = async ({id, data}) => {
    return new Promise((resolve, reject) => {
        const key = _cacheKey({id: id});
        redisClient.set(key, JSON.stringify(data), 'EX', TTL, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(true);
        })
    });
}

module.exports = {
    searchDetail,
    getCache,
    setCache
}

