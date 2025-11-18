const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth');

rrouter.post('/', moduleController.createModule);
router.get('/', moduleController.getModules);
router.put('/:id', moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule);