const express = require('express');
const router = express.Router();
const draftController = require('../controllers/draftController');

router.get('/', draftController.getAllDrafts);
router.get('/:id', draftController.getDraftById);
router.put('/:id', draftController.updateDraft);
router.delete('/:id', draftController.deleteDraft);

module.exports = router;