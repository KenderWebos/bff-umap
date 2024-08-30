const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/ApiResponse');

module.exports = function(req, res, next) {
    // Validar los resultados de express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Si hay errores, responder con un error de validación
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }
    next();
};
