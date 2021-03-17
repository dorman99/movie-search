const config = require("../config")
const Queue = require("bull");
const Model = require("../model");
const {QUEUE_SEARCH_LOGGER_JOB_NAME} = require("../utils/constants");

const searchLoggerQueue = new Queue(QUEUE_SEARCH_LOGGER_JOB_NAME, config.redis);

searchLoggerQueue.process(async (job, done) => {
    const data = job.data;
    const apiKeyId = data.apiKey.id;
    const path = data.path;
    try {
        await Model.SearchLogger.insert({endpoint: path, credentialId: apiKeyId});
        done();
    } catch (err) {
        done(err);
    }
});


searchLoggerQueue.on("complete", (job, result) => {
    console.log("COMPLETE");
    console.log(job);
    console.log(result);
})


module.exports = searchLoggerQueue;
