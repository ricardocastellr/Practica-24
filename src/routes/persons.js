const express = require('express'); // Inyectamos express
const router = express.Router(); // Generamos la instancia del router
const mongoose = require('mongoose'); // Inyectamos mongoose
let Person = require('../models/persons'); // Inyectamos persons del modelo creado anteriormente

/*
router.get('/gente', async (req, res) =>{ // Creamos una ruta para obtener todos los documentos de persons
    const Persons = await Person.find({}); // Obtenemos todas las personas y las guardamos en esta variable Persons
    res.json(Persons); // Respondemos con un json con la variable Persons (esto es para que el front-end pueda entenderlo)
});
*/

router.get("/gente", async (req, res) => { // Creamos una ruta para obtener todos los documentos de persons
    const Persons = await Person.find({}); // Obtenemos todas las personas y las guardamos en esta variable Persons
    res.render("index", { Persons }); // Respondemos renderizando Persons en index
});

router.get("/addPerson", (req, res) =>{
    res.render("addPerson") // Creamos una vista para visualizar el formulario
})

router.post('/addPerson', (req, res) => {
    const newPerson =  Person({
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }); // Este modelo tiene el Schema de MongoDB lo que nos permite crear un nuevo documento.

    newPerson
    .save() // Agregamos con "save" y recordemos que es asíncrono.
    .then(() => {res.redirect("gente")}) // Si no hubo errores lo redireccionamos a gente
    .catch((error) => {res.json({message:error})}); // Si hubo error manda mensaje con el error
});

router.get('/findById/:id', (req, res) =>{ // Endpoint para buscar el documento por id
    Person.findById(req.params.id)
    .then((myPerson) => {res.render('personUpdate', {myPerson})}) // Si encontró el documento lo enviamos a personUpdate con el parametro myPerson
    .catch((error) => {res.json({message:error})}); // Si hubo error manda mensaje con el error
})

router.post('/updatePerson', (req, res) => {
    Person.findByIdAndUpdate(req.body.objId, // Buscamos por id y actualizamos el documento que hayamos encontrado con los datos del personUpdate
    {
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipoSangre: req.body.tipoSangre,
        nss: req.body.nss
    }) // Este modelo tiene el Schema de MongoDB lo que nos permite modificar un documento.
       // Es asíncrono así que retorna una promesa, tiene dos caminos.

    .then((data) => {res.redirect("gente")}) // Si no hubo errores lo redireccionamos a gente
    .catch((error) => {res.json({message:error})}); // Si hubo error manda mensaje con el error
});

router.get('/deletePerson/:id', async (req,res) => {
    await Person.findByIdAndDelete(req.params.id) // Buscamos por id y eliminamos
    .then(() => res.redirect("../gente")) // Si no hubo errores lo redireccionamos a gente
    .catch((error) => {res.json({message:error})}); // Si hubo error manda mensaje con el error
});


router.post('/find', (req, res) => {
     Person.find({ nombre: { $regex: req.body.criteria, $options: "i"}}) // Buscamos por el campo nombre y el dato que enviamos de criteria (input) la i hace referencia a una expresión regular.
    .then((Persons) => res.render("index", { Persons })) // Si no hubo errores renderizamos index con los datos que encontró.
    .catch((error) => res.json({message:error})); // Si hubo error manda mensaje con el error
});


module.exports = router; // Exportamos el router para poder acceder a el desde otros archivos