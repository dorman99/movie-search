const Model = require("../model");
const { forbbidenAccess } = require("../utils/message_response");
const config = require("../config");
const redis = require("redis");
const redisClient = redis.createClient(config.redis);
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
    redisClient.get(key, (err, reply) => {
        if (err) {
            return Promise.reject(err);
        } else if (reply) {
            return Promise.resolve(JSON.parse(reply));
        }
        return Promise.resolve(null);
    })
}

const _setCache = async ({key, data}) => {
    redisClient.set(key, JSON.stringify(data), 'EX', TTL || 60 * 60, (err) => {
        if (err) {
            return Promise.reject(err);
        }
        return Promise.resolve(true);
    })
}

module.exports = {
    authorization
}