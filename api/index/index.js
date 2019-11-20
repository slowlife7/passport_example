const express = require("express");
const router = express.Router();
const indexCtrl = require("../index/index.ctrl");

router.get("/", indexCtrl.index);

module.exports = router;
