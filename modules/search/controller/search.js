const Service = require("../service");
const {SearchLoggerWorker} = require("../../../worker");
const { acceptResponse } = require("../../../utils/message_response");
const search = async (req, res, next) => {
    try {
        await SearchLoggerWorker.add({apiKey: req.apiKey, path: req.originalUrl}, {attempts: 5, backoff: 5000});
        res.status(202).json(acceptResponse());
        return;
    } catch (err) {
        req.error = err;
        next();
    }
}


const detail = async (req, res, next) => {
    try {
        console.log(req.apiKey);
    } catch (err) {
        req.error = err;
        next();
    }
};

module.exports = {
    search,
    detail
}