const express = require('express');
const { validate } = require('../middlewares/validation');
const { registrationForm, loginForm } = require('../middlewares/validationRules');
const { registerController, loginController } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', validate(loginForm), loginController);
router.post('/register', validate(registrationForm), registerController);

module.exports = router;