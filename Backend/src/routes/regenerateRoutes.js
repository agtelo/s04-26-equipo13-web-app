const express = require("express");
const router = express.Router();
const regenerateController = require("../controllers/regenerateController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/regenerate", authMiddleware, regenerateController.regenerate);

module.exports = router;