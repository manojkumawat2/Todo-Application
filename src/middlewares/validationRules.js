const { body } = require('express-validator');

module.exports.registrationForm = [
    body('email').isEmail().normalizeEmail(),
    body('name').notEmpty(),
    body('password').isLength({ min: 6 }),
];

module.exports.loginForm = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
]

module.exports.todoForm = [
    body('title').notEmpty(),
]