const express = require("express");
const router = express.Router();
const publishController = require("../controllers/publishController");
const { authMiddleware } = require("../middlewares/authMiddlewares");

router.post("/publish/twitter", authMiddleware, publishController.publishTwitter);
router.post("/publish/reddit", authMiddleware, publishController.publishReddit);
router.post("/publish/bluesky", authMiddleware, publishController.publishBluesky);
router.post("/publish/newsletter", authMiddleware, publishController.publishNewsletter);

module.exports = router;