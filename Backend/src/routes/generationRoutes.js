const express = require('express');
const router = express.Router();
const generationController = require('../controllers/generationController');
const { authMiddleware } = require('../middlewares/authMiddlewares');

router.post('/trigger', authMiddleware, generationController.triggerGeneration);
router.get('/history', authMiddleware, generationController.getGenerationHistory);

module.exports = router;