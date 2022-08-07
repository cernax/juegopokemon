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
    }
})

module.exports = mongoose.model('Entrenador', dataSchema)
