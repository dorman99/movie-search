const router = require("express").Router();
const AdminRoute = require("../admin/route");
const LoginRoute = require("../login/route");
const CredentialRoute = require("../credential/route");

router.use("/admins", AdminRoute);
router.use("/login", LoginRoute);
router.use("/credentials", CredentialRoute);

module.exports = router;