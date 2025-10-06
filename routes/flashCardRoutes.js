const express = require('express');
const router = express.Router();
const flashCardController = require('../controllers/flashCardController');
const auth = require('../middleware/auth');

router.post('/', auth, flashCardController.createFlashCard);
router.get('/', auth, flashCardController.getFlashCards);
router.put('/:id', auth, flashCardController.updateFlashCard);
router.delete('/:id', auth, flashCardController.deleteFlashCard);

module.exports = router;
