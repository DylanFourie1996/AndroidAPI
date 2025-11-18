const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth'); // optional if you want auth

// Routes
router.post('/', moduleController.createModule);
router.get('/', moduleController.getModules);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);

module.exports = router;
