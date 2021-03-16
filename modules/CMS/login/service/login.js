const Model = require("../../../../model");
const bcrypt = require("../../../../utils/bcrypt");
const {JwtService} = require("../../../../service");
const authorization = async ({username, password}) => {
    try {
        const account = await Model.Admin.findUsername({username});
        if (!account) {
            return Promise.reject({code: 400, validation: {username: [`Not Valid Username ${username}`]}});
        }
        const compare = await bcrypt.comparePassword({password, hashPassword: account.password});
        if (!compare) {
            return Promise.reject({code: 400, validation: {password: [`Not Valid Password`]}});
        }
        delete account.password;
        const token = JwtService.generateToken({payload: account});
        const data = {account: account, token};
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};

module.exports = {
    authorization
}