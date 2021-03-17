const router = require("express").Router();
const { Admin } = require("../../../../middleware");
const errorHandler = require("../../../../middleware/error_handler");
const {CredentialController} = require("../controller");

router.post("/", Admin.authorization, CredentialController.insert, errorHandler);
router.get("/", Admin.authorization, CredentialController.findAll, errorHandler);
router.delete("/:id", Admin.authorization, CredentialController.remove, errorHandler);

module.exports = router;