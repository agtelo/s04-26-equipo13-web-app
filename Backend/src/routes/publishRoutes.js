const express = require("express");
const router = express.Router();
const publishController = require("../controllers/publishController");

router.post("/publish/twitter", publishController.publishTwitter);
router.post("/publish/reddit", publishController.publishReddit);

module.exports = router;