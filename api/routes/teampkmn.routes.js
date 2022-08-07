const express = require('express');
const Teampkmn = require('../models/teampkmn');
const router = express.Router();

//Post Method
router.post('/', async (req, res) => {
    const data = new Teampkmn({
        idEntrenador: req.body.idEntrenador,
        idpkmn: req.body.idpkmn,
        nombrepkmn: req.body.nombrepkmn,
        imgpkmn: req.body.imgpkmn
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Teampkmn.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:nombre/:clave', async (req, res) => {
    try {
        //const data = await Model.findById(req.params.id);
        var query = { nombre: req.params.nombre, clave: req.params.clave };
        const data = await Teampkmn.find(query);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Teampkmn.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Teampkmn.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
