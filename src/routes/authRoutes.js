const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const router = express.Router();

// Ruta para el registro de usuario
router.post(
    '/register',
    [
        //check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    validationMiddleware,
    register
);

// Ruta para el login de usuario
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    validationMiddleware,
    login
);

module.exports = router;
