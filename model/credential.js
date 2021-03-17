"use strict";
const mysql = require("mysql-await");
const config = require("../config");
const {TABLE_CREDENTIAL} = require("../utils/constants");

const insert = async ({token}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            INSERT INTO ${TABLE_CREDENTIAL} (token) VALUE (?);
        `;
        const value = [token];
        await connection.awaitQuery(query, value);
        connection.end();
        return Promise.resolve(true);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.reject(err);
    }
};

const find = async ({id}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            SELECT * FROM ${TABLE_CREDENTIAL} WHERE id = ? AND deleted_At IS NULL;
        `;
        const value = [id];
        const result = await connection.awaitQuery(query, value);
        connection.end();
        const credential = result.length > 0 ? _mapping({row: result[0]}) : null;
        return Promise.resolve(credential);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.reject(err);
    }
};

const findToken = async ({token}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            SELECT * FROM ${TABLE_CREDENTIAL} WHERE token = ? AND deleted_at IS NULL;
        `;
        const value = [token];
        const result = await connection.awaitQuery(query, value);
        connection.end();
        const credential = result.length > 0 ? _mapping({row: result[0]}) : null;
        return Promise.resolve(credential);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.reject(err);
    }
};

const findAll = async ({limit, skip}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            SELECT * FROM ${TABLE_CREDENTIAL} WHERE deleted_At IS NULL LIMIT ? OFFSET ?;
        `;
        const value = [limit, skip];
        const result = await connection.awaitQuery(query, value);
        connection.end();
        const credentials = result.map(r => _mapping({row: r}));
        return Promise.resolve(credentials);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.reject(err);
    }
};

const remove = async ({id}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            UPDATE ${TABLE_CREDENTIAL} SET deleted_at = NOW()
            WHERE id = ?;
        `;
        const value = [id];
        await connection.awaitQuery(query, value);
        connection.end();
        return Promise.resolve(true);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.reject(err);
    }
};

const _mapping = ({row}) => {
    return {
        id: parseInt(row.id),
        token: row.token,
        c_at: row.c_at,
        u_at: row.u_at
    }
};

module.exports = {
    insert,
    remove,
    find,
    findToken,
    findAll
}