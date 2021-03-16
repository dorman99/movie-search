const router = require("express").Router();
const CmsRouter = require("../modules/CMS/route");
router.use("/cms", CmsRouter);

module.exports = router;