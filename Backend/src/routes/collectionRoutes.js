const express = require('express');
const router = express.Router();
const collectionController = require('../controllers/collectionController');
const { authMiddleware } = require('../middlewares/authMiddlewares');

// Endpoint to collect messages manually (when user clicks Refresh button)
router.post('/trigger', authMiddleware, collectionController.triggerCollection);

module.exports = router;
