const router = require("express").Router();
const {ErrorHandler} = require("../../../../middleware");
const {LoginController} = require("../controller");

router.use("/", LoginController.authorization, ErrorHandler);

module.exports = router;