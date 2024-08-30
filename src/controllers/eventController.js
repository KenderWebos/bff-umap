const Event = require('../models/Event');
const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/ApiResponse');

exports.createEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { fecha, titulo, descripcion, duracion, revisado, location } = req.body;

    try {
        const event = new Event({
            fecha,
            titulo,
            descripcion,
            duracion,
            revisado,
            location,
        });

        await event.save();

        res.status(201).json(new ApiResponse(201, 'Created', event));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(new ApiResponse(200, 'OK', events));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Event not found'));
        }
        res.status(200).json(new ApiResponse(200, 'OK', event));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.updateEvent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiResponse(400, 'Bad Request', null, errors.array()));
    }

    const { fecha, titulo, descripcion, duracion, revisado, location } = req.body;

    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Event not found'));
        }

        if (fecha) event.fecha = fecha;
        if (titulo) event.titulo = titulo;
        if (descripcion) event.descripcion = descripcion;
        if (duracion) event.duracion = duracion;
        if (revisado) event.revisado = revisado;
        if (location) event.location = location;

        await event.save();

        res.status(200).json(new ApiResponse(200, 'OK', event));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json(new ApiResponse(404, 'Not Found', null, 'Event not found'));
        }

        await event.remove();

        res.status(200).json(new ApiResponse(200, 'OK', 'Event deleted'));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(new ApiResponse(500, 'Server Error', null));
    }
};
