const express = require('express');
const router = express.Router();
const generationController = require('../controllers/generationController');

router.post('/trigger', generationController.triggerGeneration);
router.get('/history', generationController.getGenerationHistory);

module.exports = router;