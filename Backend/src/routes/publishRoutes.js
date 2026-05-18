const express = require("express");
const router = express.Router();
const publishController = require("../controllers/publishController");
const { authMiddleware } = require("../middlewares/authMiddlewares");

router.post(
  "/publish/twitter",
  authMiddleware,
  publishController.publishTwitter,
);
router.post("/publish/reddit", authMiddleware, publishController.publishReddit);

module.exports = router;

