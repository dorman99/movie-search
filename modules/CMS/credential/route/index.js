const router = require("express").Router();
const { authorization } = require("../../../../middleware/admin");
const errorHandler = require("../../../../middleware/error_handler");
const {CredentialController} = require("../controller");

router.post("/", authorization, CredentialController.insert, errorHandler);
router.get("/", authorization, CredentialController.findAll, errorHandler);
router.delete("/:id", authorization, CredentialController.remove, errorHandler);

module.exports = router;