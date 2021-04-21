const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

let Schema = mongoose.Schema;

let productoSchema = new Schema({
  title: String,
  price: Number,
  thumbnail: String
})


productoSchema.plugin(AutoIncrement, {inc_field: 'id'});
module.exports = mongoose.model('Producto', productoSchema)