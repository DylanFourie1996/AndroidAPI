const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');
const auth = require('../middleware/auth'); // optional if you use JWT

router.post('/', auth, moduleController.createModule);
router.get('/', auth, moduleController.getModules);
router.put('/:id', auth, moduleController.updateModule);
router.delete('/:id', moduleController.deleteModule); // or auth + delete

module.exports = router;
