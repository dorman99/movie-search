const Model = require("../../../../model");

const findByCredentialId = async ({id, limit, skip}) => {
    return await Model.SearchLogger.findByCredential({credentialId: id, limit, skip});
};

const findAll = async ({limit, skip}) => {
    return await Model.SearchLogger.findAll({limit, skip});
};


module.exports = {
    findByCredentialId,
    findAll
}