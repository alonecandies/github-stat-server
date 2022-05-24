const express = require("express");
const router = express.Router();
const stat = require("../controllers/stat.controller");

router.post("/getTotalStat", stat.getTotalStat);

module.exports = router;