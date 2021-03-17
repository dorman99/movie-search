"use strict";

const Service = require("../service");
const Validation = require("validate.js");
const MessageResponse = require("../../../../utils/message_response");

const insert = async (req, res, next) => {
    const constraints = {
        username: {presence: true},
        password: {presence: true}
    };
    const validation = Validation.validate(req.body, constraints, {fullMessages: false});
    if (validation) {
        req.error = {
            code: 400,
            validation
        };
        next();
        return;
    }
    try {
        const used = await Service.Admin.findUsername({username: req.body.username});
        if (used) {
            req.error = {
                code: 400,
                validation: {
                    username: [`Username has been used`]
                }
            }
            next();
            return;
        }
        await Service.Admin.insert({username: req.body.username, password: req.body.password});
        res.status(202).json(MessageResponse.acceptResponse());
        return;
    } catch (err) {
        req.error = err;
        next();
        return;
    }
};

module.exports = {
    insert
}