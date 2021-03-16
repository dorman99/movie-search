const {JwtService} = require("../service");
const { unatuhorizedResponse } = require("../utils/message_response");
const authorization = async (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader) {
        res.status(401).json(unatuhorizedResponse());
        return;
    }
    const bearerHeader = authorizationHeader.split(" ")[0];
    const tokenHeader = authorizationHeader.split(" ")[1];
    if (!tokenHeader || bearerHeader != "Bearer") {
        res.status(401).json(unatuhorizedResponse());
        return;
    }
    try {
        const payload = await JwtService.verify({token: tokenHeader});
        req.payload = payload;
        next();
        return;
    } catch (err) {
        res.status(401).json(unatuhorizedResponse());
        return;
    }
};

module.exports = {
    authorization
}