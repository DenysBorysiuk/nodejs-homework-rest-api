const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const { addSchema, updateSchema } = require("../../schemas/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateBody(addSchema), ctrl.addNew);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", validateBody(updateSchema), ctrl.updateById);

module.exports = router;
