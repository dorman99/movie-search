const router = require("express").Router();
const { Admin, ErrorHandler } = require("../../../../middleware");
const { SearchLoggerController } = require("../controller");

router.get("/", Admin.authorization, SearchLoggerController.findAll, ErrorHandler);
router.get("/credentials/:token", Admin.authorization, SearchLoggerController.findByCredential, ErrorHandler);

module.exports = router;