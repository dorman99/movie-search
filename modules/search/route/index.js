const router = require("express").Router();
const { ErrorHandler, Key } = require("../../../middleware");
const {SearchController} = require("../controller");

router.post("/", Key.authorization, SearchController.search, ErrorHandler);
router.get("/detail/:id", Key.authorization, SearchController.detail, ErrorHandler);

module.exports = router;