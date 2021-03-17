"use strict";
const router = require("express").Router();
const {AdminController} = require("../controller");
const {ErrorHandler, Admin} = require("../../../../middleware");

router.post("/", Admin.authorization, AdminController.insert, ErrorHandler);

module.exports = router;