const express = require('express');
const router = express.Router();
const flashCardController = require('../controllers/flashCardController');

router.post('/',  flashCardController.createFlashCard);
router.get('/',  flashCardController.getFlashCards);
router.put('/:id',  flashCardController.updateFlashCard); 
router.delete('/:id', flashCardController.deleteFlashCard); 

module.exports = router;
