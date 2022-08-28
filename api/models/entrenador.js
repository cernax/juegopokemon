const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: String
    },
    nombre: {
        required: true,
        type: String
    },
    clave: {
        required: true,
        type: String
    },
    sexo: {
        required: true,
        type: String
    },
    team: {
        required: true,
        type: Object
    }
})

module.exports = mongoose.model('Entrenador', dataSchema)
