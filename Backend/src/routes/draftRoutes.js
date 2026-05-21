const express = require('express');
const router = express.Router();
const draftController = require('../controllers/draftController');
const { authMiddleware } = require('../middlewares/authMiddlewares');

router.get('/', authMiddleware, draftController.getAllDrafts);
router.get('/:id', authMiddleware, draftController.getDraftById);
router.put('/:id', authMiddleware, draftController.updateDraft);
router.delete('/:id', authMiddleware, draftController.deleteDraft);

module.exports = router;