require('dotenv').config('./.env');
const bcrypt = require('bcrypt');

let _genSalt = () => {
    return bcrypt.genSaltSync(parseInt(process.env.PASSWORD_SALT_ROUND || 10));
}

let hashPassword = async ({password}) => {
    const salt = _genSalt();
    return await bcrypt.hash(password, salt);
}

let comparePassword = async ({password, hashPassword}) => {
    return await bcrypt.compare(password, hashPassword);
}

module.exports = {
    hashPassword,
    comparePassword
}