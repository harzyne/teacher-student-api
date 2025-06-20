const express = require('express');
const router = express.Router();
const suspendController = require('../controllers/suspendController');

router.post('/suspend', suspendController.suspendStudent);

module.exports = router;
