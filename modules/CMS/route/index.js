const router = require("express").Router();
const AdminRoute = require("../admin/route");
const LoginRoute = require("../login/route");
const CredentialRoute = require("../credential/route");
const SearchLoggerRoute = require("../search_logger/route");

router.use("/admins", AdminRoute);
router.use("/login", LoginRoute);
router.use("/credentials", CredentialRoute);
router.use("/search-loggers", SearchLoggerRoute);

module.exports = router;