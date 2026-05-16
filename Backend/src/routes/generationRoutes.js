const express = require('express');
const router = express.Router();
const generationController = require('../controllers/generationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/trigger', authMiddleware, generationController.triggerGeneration);
router.get('/history', authMiddleware, generationController.getGenerationHistory);

module.exports = router;