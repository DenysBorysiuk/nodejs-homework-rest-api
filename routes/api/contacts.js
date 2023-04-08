const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const schema = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(schema.addSchema), ctrl.addNew);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(schema.addSchema), ctrl.updateById);

module.exports = router;
