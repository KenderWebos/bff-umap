const express = require('express');
const { check } = require('express-validator');
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const router = express.Router();

// Crear un nuevo evento
router.post(
    '/',
    authMiddleware,
    [
        check('fecha', 'Fecha is required').isISO8601().toDate(),
        check('titulo', 'Titulo is required').not().isEmpty(),
        check('descripcion', 'Descripcion is required').not().isEmpty(),
        check('duracion', 'Duracion is required').not().isEmpty(),
        check('revisado', 'Revisado is required').not().isEmpty(),
        check('location', 'Location ID is required').not().isEmpty(),
    ],
    validationMiddleware,
    createEvent
);

// Obtener todos los eventos
router.get('/', authMiddleware, getEvents);

// Obtener un evento por ID
router.get('/:id', authMiddleware, getEventById);

// Actualizar un evento
router.put(
    '/:id',
    authMiddleware,
    [
        check('fecha', 'Fecha is required').optional().isISO8601().toDate(),
        check('titulo', 'Titulo is required').optional().not().isEmpty(),
        check('descripcion', 'Descripcion is required').optional().not().isEmpty(),
        check('duracion', 'Duracion is required').optional().not().isEmpty(),
        check('revisado', 'Revisado is required').optional().not().isEmpty(),
        check('location', 'Location ID is required').optional().not().isEmpty(),
    ],
    validationMiddleware,
    updateEvent
);

// Eliminar un evento
router.delete('/:id', authMiddleware, deleteEvent);

module.exports = router;
