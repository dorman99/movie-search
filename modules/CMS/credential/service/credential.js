"use strict";
const {Credential} = require("../../../../model");
const helpers = require("../../../../utils/helpers");

const insert = async ({}) => {
    const token = helpers.randString({length: 16});
    const f = await Credential.findToken({token});
    if (f) {
        return await insert({});
    }
    return await Credential.insert({token});
}

const findAll = async ({limit, skip}) => {
    return await Credential.findAll({limit, skip});
}

const remove = async ({id}) => {
    return await Credential.remove({id});
}

const findToken = async ({token}) => {
    return await Credential.findToken({token});
}

module.exports = {
    insert,
    findAll,
    remove,
    findToken
}