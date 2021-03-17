const Model = require("../model");
const { forbbidenAccess } = require("../utils/message_response");
const config = require("../config");
const redis = require("redis");
let redisClient = redis.createClient(config.redis);
const TTL = 60 * 60;

const authorization = async (req, res, next) => {
    const token = req.query.apikey;
    if (!token) {
        res.status(403).json(forbbidenAccess());
        return;
    }
    const cacheKey = _cacheKey({credentialToken: token});
    let credential = await _getCache({key: cacheKey});
    if (credential) {
        req.apiKey = credential;
        next();
        return;
    } 
    credential = await Model.Credential.findToken({token: token});
    if (!credential) {
        res.status(403).json(forbbidenAccess());
        return;
    }
    await _setCache({data: credential, key: cacheKey})
    req.apiKey = credential;
    next();
}

const _cacheKey = ({credentialToken}) => `credentials:${credentialToken}`;

const _getCache = async ({key}) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, reply) => {
            if (err) {
                return reject(err);
            } else if (reply) {
                return resolve(JSON.parse(reply));
            }
            return resolve(null);
        })
    });
}

const _setCache = async ({key, data}) => {
    return new Promise((resolve, reject) => {
        redisClient.set(key, JSON.stringify(data), 'EX', TTL || 60 * 60, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(true);
        })
    });
}

module.exports = {
    authorization
}