require("dotenv").config();
module.exports = {
    "connectionLimit" : process.env.MYSQL_CONNECTION_LIMIT || 10,
    "host"            : process.env.MYSQL_HOST || "localhost",
    "user"            : process.env.MYSQL_USER || "root",
    "password"        : process.env.MYSQL_PASSWORD || "1234",
    "database"        : process.env.MYSQL_LOGGER_DB || "logger"
};