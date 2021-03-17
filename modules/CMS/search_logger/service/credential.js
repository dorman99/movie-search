"use strict";
const {Credential} = require("../../../../model");

const findToken = async ({token}) => {
    return await Credential.findToken({token});
}

module.exports = {
    findToken
}