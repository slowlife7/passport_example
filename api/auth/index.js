const express = require("express");
const router = express.Router();
const ctrl = require("./auth.ctrl");

router.get("/", ctrl.show);
router.get("/logout", ctrl.destroy);
router.post("/login", ctrl.authenticate, ctrl.login);

module.exports = router;
