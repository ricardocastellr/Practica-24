const mongoose = require('mongoose'); // Inyectamos mongoose
let personSchema = new mongoose.Schema({ // Instanciamos un nuevo Schema de mongoose
    nombre: String,
    edad: Number,
    tipoSangre: String,
    nss: String
});

module.exports = mongoose.model('Persons', personSchema) // Exportamos una instancia de un modelo de mongoose para poder acceder a el desde otros archivos