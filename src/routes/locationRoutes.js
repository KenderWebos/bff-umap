const express = require('express');
const { check } = require('express-validator');
const { createLocation, getLocations, getLocationById, updateLocation, deleteLocation } = require('../controllers/locationController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const router = express.Router();

// Crear una nueva ubicación
router.post(
    '/',
    authMiddleware,
    [
        check('nombre', 'Nombre is required').not().isEmpty(),
        check('descripcion', 'Descripcion is required').not().isEmpty(),
        check('descripcionLarga', 'DescripcionLarga is required').not().isEmpty(),
        check('nombreLocalizacion', 'NombreLocalizacion is required').not().isEmpty(),
        check('tipo', 'Tipo is required').not().isEmpty(),
        check('imagen', 'Imagen is required').not().isEmpty(),
        check('latitud', 'Latitud is required').not().isEmpty(),
        check('longitud', 'Longitud is required').not().isEmpty(),
        check('codigo', 'Codigo is required').not().isEmpty(),
        check('iconoPrimario', 'IconoPrimario is required').not().isEmpty(),
        check('iconoSecundario', 'IconoSecundario is required').not().isEmpty(),
        check('iconoTerciario', 'IconoTerciario is required').not().isEmpty(),
    ],
    validationMiddleware,
    createLocation
);

// Obtener todas las ubicaciones
router.get('/', authMiddleware, getLocations);

// Obtener una ubicación por ID
router.get('/:id', authMiddleware, getLocationById);

// Actualizar una ubicación
router.put(
    '/:id',
    authMiddleware,
    [
        check('nombre', 'Nombre is required').optional().not().isEmpty(),
        check('descripcion', 'Descripcion is required').optional().not().isEmpty(),
        check('descripcionLarga', 'DescripcionLarga is required').optional().not().isEmpty(),
        check('nombreLocalizacion', 'NombreLocalizacion is required').optional().not().isEmpty(),
        check('tipo', 'Tipo is required').optional().not().isEmpty(),
        check('imagen', 'Imagen is required').optional().not().isEmpty(),
        check('latitud', 'Latitud is required').optional().not().isEmpty(),
        check('longitud', 'Longitud is required').optional().not().isEmpty(),
        check('codigo', 'Codigo is required').optional().not().isEmpty(),
        check('iconoPrimario', 'IconoPrimario is required').optional().not().isEmpty(),
        check('iconoSecundario', 'IconoSecundario is required').optional().not().isEmpty(),
        check('iconoTerciario', 'IconoTerciario is required').optional().not().isEmpty(),
    ],
    validationMiddleware,
    updateLocation
);

// Eliminar una ubicación
router.delete('/:id', authMiddleware, deleteLocation);

module.exports = router;
