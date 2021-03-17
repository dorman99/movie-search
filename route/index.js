const router = require("express").Router();
const CmsRouter = require("../modules/CMS/route");
const SearchRouter = require("../modules/search/route");

router.use("/cms", CmsRouter);
router.use("/search", SearchRouter);

module.exports = router;