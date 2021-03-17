const Service = require("../service");
const {SearchLoggerWorker} = require("../../../worker");
const { successDefaultResponse, notFound } = require("../../../utils/message_response");
const { paginationResponse } = require("../../../utils/helpers");
const search = async (req, res, next) => {
    try {
        const {keyword, page} = req.query;
        if (!keyword) {
            req.error = {
                code: 400,
                validation: {keyword: ["Must be Provide"]}
            }
            next();
            return;
        }
        const search = await Service.Search.searchKeyword({keyword: keyword, page: parseInt(page || 1)})
        await SearchLoggerWorker.add({apiKey: req.apiKey, path: req.originalUrl}, {attempts: 5, backoff: 5000});
        const data = paginationResponse({data: search});
        res.status(200).json(successDefaultResponse({data: data}));
        return;
    } catch (err) {
        req.error = err;
        next();
    }
}


const detail = async (req, res, next) => {
    try {
        await SearchLoggerWorker.add({apiKey: req.apiKey, path: req.originalUrl}, {attempts: 5, backoff: 5000});
        let search = await Service.Cache.Search.searchDetail({id: req.params.id});
        if (search) {
            res.status(200).json(successDefaultResponse({data: search}));
            return;
        }
        search = await Service.Search.searchDetail({id: req.params.id})
        if (search) {
            await Service.Cache.Search.setCache({id: req.params.id, data: search});
            res.status(200).json(successDefaultResponse({data: search}));
            return;
        }
        res.status(404).json(notFound());
        return;
    } catch (err) {
        req.error = err;
        next();
    }
};

module.exports = {
    search,
    detail
}