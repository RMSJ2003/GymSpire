const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// TEST
router
    .route('/signup')
    .get(authController.signup);

module.exports = router;
