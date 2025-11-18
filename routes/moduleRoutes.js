const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth');

router.post('/', auth, moduleController.createModule);

// Get all modules
router.get('/', auth, moduleController.getModules);

// Update a module by ID
router.put('/:id', auth, moduleController.updateModule);

// Delete a module by ID
router.delete('/:id', auth, moduleController.deleteModule);

module.exports = router;
