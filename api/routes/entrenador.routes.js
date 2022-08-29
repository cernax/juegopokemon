const express = require('express');
const Entrenador = require('../models/entrenador');
const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
    const data = new Entrenador({
        id: req.body.id,
        nombre: req.body.nombre,
        clave: req.body.clave,
        sexo: req.body.sexo,
        correo: req.body.correo,
        team:req.body.team
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
        const data = await Entrenador.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Get last Method
router.get('/getLast', async (req, res) => {
    try {
        const data = await Entrenador.find().sort({ _id:-1 }).limit(1);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by user pass Method
router.get('/getOne/:nombre/:clave', async (req, res) => {
    try {
        //const data = await Model.findById(req.params.id);
        var query = { nombre: req.params.nombre, clave: req.params.clave };
        const data = await Entrenador.find(query);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        //const data = await Model.findById(req.params.id);
        var query = { id: req.params.id };
        const data = await Entrenador.find(query);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        debugger;
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Entrenador.updateOne({ id: id }, updatedData, options);

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
        const data = await Entrenador.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
