const express = require("express");
const router = express.Router();
const regenerateController = require("../controllers/regenerateController");

router.post("/regenerate", regenerateController.regenerate);

module.exports = router;