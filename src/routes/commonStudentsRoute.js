const express = require('express');
const router = express.Router();
const commonStudentsController = require('../controllers/commonStudentsController');

router.get('/commonstudents', commonStudentsController.getCommonStudents);

module.exports = router;
