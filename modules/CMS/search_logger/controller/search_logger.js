const { paginationResponse } = require("../../../../utils/helpers");
const { successDefaultResponse, notFound } = require("../../../../utils/message_response");
const Service = require("../service");

const findAll = async (req, res, next) => {
    try {
        const {limit, skip} = req.query;
        const logs = await Service.SearchLogger.findAll({limit: parseInt(limit || 10), skip: parseInt(skip || 0)});
        const data = paginationResponse({data: logs});
        res.status(200).json(successDefaultResponse({data}));
        return;
    } catch (err) {
        req.error = err;
        next();
    }
}

const findByCredential = async (req, res, next) => {
    try {
        const {token} = req.params;
        const {limit, skip} = req.query;
        const t = await Service.Credential.findToken({token});
        if (!t) {
            res.status(404).json(notFound());
            return;
        }
        const logs = await Service.SearchLogger.findByCredentialId({id: t.id, limit: parseInt(limit || 10), skip: parseInt(skip || 0)});
        const data = paginationResponse({data: logs});
        res.status(200).json(successDefaultResponse({data}))
    } catch (err) {
        req.error = err;
        next();
    }
};

module.exports = {
    findAll,
    findByCredential
}