"use strict";

module.exports = {
    host: process.env.OMDB_HOST || "https://www.omdbapi.com",
    api_key: process.env.OMDB_API_KEY || null
}