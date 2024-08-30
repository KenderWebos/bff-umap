const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
    },
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    duracion: {
        type: String,
        required: true,
    },
    revisado: {
        type: String,
        required: true,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
    },
    /*attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],*/
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Event', EventSchema);
