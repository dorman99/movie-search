require("dotenv").config();
const jsonWebToken = require("jsonwebtoken");
const {JWT_SECRET, JWT_TTL} = process.env;

const generateToken = ({payload}) => {
    let options = {
        expiresIn: parseInt(JWT_TTL || '365d')
    }
    return jsonWebToken.sign(payload, JWT_SECRET || "ABCD", options);
}

const verify = async ({token}) => {
    return await jsonWebToken.verify(token, JWT_SECRET || "ABCD", {});
}

module.exports = {
    generateToken,
    verify
}