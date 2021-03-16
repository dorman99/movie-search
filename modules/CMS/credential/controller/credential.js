const Service = require("../service");
const { acceptResponse, successDefaultResponse } = require("../../../../utils/message_response");
const { paginationResponse } = require("../../../../utils/helpers");
const insert = async (req, res, next) => {
    try {
        await Service.Credential.insert({});
        res.status(202).json(acceptResponse());
        return;
    } catch (err) {
        req.error = err;
        next();
    }
}

const findAll = async (req, res, next) => {
    try {
        const {limit, skip} = req.query;
        const credentials = await Service.Credential.findAll({limit: parseInt(limit || 10), skip: parseInt(skip || 0)});
        const data = paginationResponse({data: credentials});
        res.status(200).json(successDefaultResponse({data}))
    } catch (err) {
        req.error = err;
        next();
    }
}

const remove = async (req, res, next) => {
    try {
        await Service.Credential.remove({id: req.params.id});
        res.status(202).json(acceptResponse());
        return;
    } catch (err) {
        req.error = err;
        next();
    }
}

module.exports = {
    insert,
    findAll,
    remove
}