const express = require('express');
const router = express.Router();
const communityFeedController = require('../controllers/communityFeedController');
const { authMiddleware } = require('../middlewares/authMiddlewares');

router.get('/', authMiddleware, communityFeedController.getCommunityFeed);

module.exports = router;