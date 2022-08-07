const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    idEntrenador: {
        required: true,
        type: String
    },
    idpkmn: {
        required: true,
        type: String
    },
    nombrepkmn: {
        required: true,
        type: String
    },
    imgpkmn: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Team', dataSchema)
