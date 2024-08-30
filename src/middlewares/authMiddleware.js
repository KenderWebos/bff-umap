const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/ApiResponse');

module.exports = function(req, res, next) {
    // Obtener el token del encabezado de la petición
    const token = req.header('x-auth-token');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json(new ApiResponse(401, 'Unauthorized', null, 'No token, authorization denied'));
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Agregar el usuario al objeto de la petición
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json(new ApiResponse(401, 'Unauthorized', null, 'Token is not valid'));
    }
};
