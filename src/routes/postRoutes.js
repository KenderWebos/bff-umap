const express = require('express');
const { check } = require('express-validator');
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMiddleware = require('../middlewares/validationMiddleware');
const router = express.Router();

// Crear una nueva ubicación
router.post(
    '/',
    createPost
);

// Obtener todas las ubicaciones
router.get('/', authMiddleware, getPosts);

// Obtener una ubicación por ID
router.get('/:id', authMiddleware, getPostById);

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
    updatePost
);

// Eliminar una ubicación
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
