"use strict";
const Model = require("../../../../model");
const bcrypt = require("../../../../utils/bcrypt");

const insert = async ({username, password}) => {
    const hashedPassword = await bcrypt.hashPassword({password});
    return await Model.Admin.insert({username, password: hashedPassword});
};

const findUsername = async ({username}) => {
    return await Model.Admin.findUsername({username});
};

module.exports = {
    insert,
    findUsername
}