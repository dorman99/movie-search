const config = require("../../../config");
const axios = require("axios");

const searchKeyword = async ({keyword, page}) => {
    try {
        const url = config.omdb.host + '/?apikey=' + config.omdb.api_key + '&s=' + keyword + '&page=' + page;
        const request = await axios.post(url);
        const data = request.data;
        return Promise.resolve(data.Search);
    } catch (err) {
        return Promise.reject(err);
    }
}

const searchDetail = async ({id}) => {
    try {
        const url = config.omdb.host + '/?apikey=' + config.omdb.api_key + '&i=' + id;
        const request = await axios.post(url);
        const data = request.data;
        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {
    searchKeyword,
    searchDetail
}