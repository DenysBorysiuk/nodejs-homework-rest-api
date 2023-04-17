const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");

const validateBody = require("../../middlewares/validateBody");

const authenticate = require("../../middlewares/authenticate");

const { authSchema, subscriptionScema } = require("../../models/user");

router.post("/register", validateBody(authSchema), ctrl.register);

router.post("/login", validateBody(authSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateBody(subscriptionScema),
  ctrl.updateSubscription
);

module.exports = router;
