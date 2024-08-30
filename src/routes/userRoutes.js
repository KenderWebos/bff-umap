const express = require('express');
const { check } = require('express-validator');
const { getUser, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const router = express.Router();

// Obtener información del usuario autenticado
router.get('/me', authMiddleware, getUser);

// Actualizar información del usuario
router.put(
    '/me',
    authMiddleware,
    [
        check('name', 'Name is required').optional().not().isEmpty(),
        check('email', 'Please include a valid email').optional().isEmail(),
    ],
    validationMiddleware,
    updateUser
);

// Eliminar cuenta de usuario
router.delete('/me', authMiddleware, deleteUser);

module.exports = router;
