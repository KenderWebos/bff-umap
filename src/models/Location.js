const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    descripcionLarga: {
        type: String,
        required: true,
    },
    nombreLocalizacion: {
        type: String,
        required: true,
    },
    tipo: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    latitud: {
        type: String,
        required: true,
    },
    longitud: {
        type: String,
        required: true,
    },
    codigo: {
        type: String,
        required: false,
    },
    iconoPrimario: {
        type: String,
        required: false,
    },
    iconoSecundario: {
        type: String,
        required: false,
    },
    iconoTerciario: {
        type: String,
        required: false,
    },
    /*user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },*/
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Location', LocationSchema);
