"use strict";

const mysql = require("mysql-await");
const config = require("../config");
const {TABLE_SEARCH_LOGGER} = require("../utils/constants");

const insert = async ({endpoint, credentialId}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            INSERT INTO ${TABLE_SEARCH_LOGGER} (endpoint, credentialId) VALUE (?, ?);
        `;
        const value = [endpoint, credentialId];
        await connection.awaitQuery(query, value);
        connection.end();
        return Promise.resolve(true);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.resolve(err);
    }
};

const findAll = async ({limit, skip}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            SElECT * FROM ${TABLE_SEARCH_LOGGER} ORDER BY c_at DESC LIMIT ? OFFSET ?;
        `;
        const value = [limit, skip];
        const results = await connection.awaitQuery(query, value);
        const logs = results.map(r => _mapping({row: r}));
        return Promise.resolve(logs);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.resolve(err);
    }
}

const findByCredential = async ({credentialId, limit, skip}) => {
    const connection = mysql.createPool(config.mySql);
    try {
        const query = `
            SElECT * FROM ${TABLE_SEARCH_LOGGER} 
            WHERE credentialId = ?
            ORDER BY c_at DESC LIMIT ? OFFSET ?;
        `;
        const value = [credentialId, limit, skip];
        const results = await connection.awaitQuery(query, value);
        const logs = results.map(r => _mapping({row: r}));
        return Promise.resolve(logs);
    } catch (err) {
        connection.end();
        err.code = 500;
        return Promise.resolve(err);
    }
}



const _mapping = ({row}) => {
    return {
        id: row.id,
        credentialId: row.credentialId,
        endpoint: row.endPoint,
        c_at: row.c_at,
        u_at: row.u_at
    }
}

module.exports = {
    insert,
    findAll,
    findByCredential
};