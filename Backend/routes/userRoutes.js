const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/userController');

// Route for user signup
router.post('/signup', signup);

// Route for user login
router.post('/login', login);

module.exports = router;
