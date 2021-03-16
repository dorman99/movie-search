"use strict";

const mysql = require("mysql-await");
const config = require("../config");
const {TABLE_ADMIN} = require("../utils/constants");

const insert = async ({username, password}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            INSERT INTO ${TABLE_ADMIN} (username, password) 
            VALUE (?, ?);`;

        const value = [username, password];
        await connection.awaitQuery(query, value);
        connection.end();
        return Promise.resolve(true);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.reject(err);
    }
};

const findUsername = async ({username}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            SELECT * FROM ${TABLE_ADMIN} where username = ?;
        `;
        const value = [username];
        const result = await connection.awaitQuery(query, value);
        connection.end();
        const data = result.length > 0 ? _mapping({row: result[0]}) : null;
        return Promise.resolve(data);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.reject(err);
    }
}

const _mapping = ({row}) => {
    return {
        id: row.id,
        username: row.username,
        password: row.password
    }
}

module.exports = {
    insert,
    findUsername
};