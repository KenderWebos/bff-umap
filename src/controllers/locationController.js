const Location = require('../models/Location');
const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/ApiResponse');

exports.createLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { nombre, descripcion, descripcionLarga, nombreLocalizacion, tipo, imagen, latitud, longitud, codigo, iconoPrimario, iconoSecundario, iconoTerciario } = req.body;

    try {
        const location = new Location({
            nombre, 
            descripcion, 
            descripcionLarga, 
            nombreLocalizacion, 
            tipo, 
            imagen, 
            latitud, 
            longitud, 
            codigo, 
            iconoPrimario, 
            iconoSecundario, 
            iconoTerciario
            //user: req.user.id,
        });

        await location.save();

        res.status(201).json(new ApiResponse(201, 'Created', location));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(new ApiResponse(200, 'OK', locations));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.getLocationById = async (req, res) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Location not found'));
        }
        res.status(200).json(new ApiResponse(200, 'OK', location));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.updateLocation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { nombre, descripcion, descripcionLarga, nombreLocalizacion, tipo, imagen, latitud, longitud, codigo, iconoPrimario, iconoSecundario, iconoTerciario } = req.body;

    try {
        let location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Location not found'));
        }

        if (nombre) location.nombre = nombre;
        if (descripcion) location.descripcion = descripcion;
        if (descripcionLarga) location.descripcionLarga = descripcionLarga;
        if (nombreLocalizacion) location.nombreLocalizacion = nombreLocalizacion;
        if (tipo) location.tipo = tipo;
        if (imagen) location.imagen = imagen;
        if (latitud) location.latitud = latitud;
        if (longitud) location.longitud = longitud;
        if (codigo) location.codigo = codigo;
        if (iconoPrimario) location.iconoPrimario = iconoPrimario;
        if (iconoSecundario) location.iconoSecundario = iconoSecundario;
        if (iconoTerciario) location.iconoTerciario = iconoTerciario;

        await location.save();

        res.status(200).json(new ApiResponse(200, 'OK', location));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.deleteLocation = async (req, res) => {
    try {
        let location = await Location.findById(req.params.id);
        if (!location) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Location not found'));
        }

        await location.remove();

        res.status(200).json(new ApiResponse(200, 'OK', 'Location deleted'));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};
