const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/retrievefornotifications', notificationController.getRecipients);

module.exports = router;
