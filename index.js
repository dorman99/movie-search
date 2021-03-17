"use strict";
require("dotenv").config();
const {SERVER_PORT} = process.env;
const express = require('express')
const app = express();
const bodyParser = require("body-parser");
const routers = require("./route");
let appInUse = null;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use("/api/v1", routers);

appInUse = app.listen(SERVER_PORT || 5000, (err) => {
    if (err) console.log(err);
    console.log("Port Run: " + SERVER_PORT || 5000); 
});

const shutDown = () => {
    appInUse.close(() => {
        console.log("Graceful stop server...");
        process.exit(0);
    })
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('SIGTSTP', shutDown);