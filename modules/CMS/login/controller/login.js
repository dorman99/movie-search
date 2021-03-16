const Service = require("../service");
const ValidationUtil = require("validate.js");
const { successDefaultResponse } = require("../../../../utils/message_response");

const authorization = async (req, res, next) => {
    try {
        const constraints = {
            username: {presence: true},
            password: {presence: true}
        };
        const validation = ValidationUtil.validate(req.body, constraints, {fullMessages: false});
        if (validation) {
            req.error = {
                code: 400,
                validation
            };
            next();
            return;
        }
        const data = await Service.Login.authorization({username: req.body.username, password: req.body.password});
        res.status(200).json(successDefaultResponse({data}));
        return;
    } catch (err) {
        req.error = err;
        next();
        return;
    }
};

module.exports = {
    authorization
};