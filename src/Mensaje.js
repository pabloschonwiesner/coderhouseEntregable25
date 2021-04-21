const mongoose = require('mongoose')


let Schema = mongoose.Schema;

let mensajeSchema = new Schema({
  author: {
    email: String,
    nombre: String,
    apellido: String,
    edad: Number,
    alias: String,
    avatar: String
  },
  text: String
})

module.exports = mongoose.model('Mensajes', mensajeSchema)