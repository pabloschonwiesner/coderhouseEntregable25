const faker = require('faker')
const Producto = require('./Producto')

faker.locale = 'es'

class ProductoBD {

  async getAll () {
    // return this.productos
    let prod = await Producto.find({})

    if(prod.length == 0) {
      console.log('no es array');
      
      return []
    }
    
    return prod;
  }

  async getOne ( id ) {
    return await Producto.findOne({ id })
    
  }

  async add ( producto ) {
    console.log(producto)
    let nuevoProducto = new Producto( { title: producto.title, price: producto.price, thumbnail: producto.thumbnail })
    return await nuevoProducto.save() 
  }

  async update ( producto) {
    return await Producto.updateOne( { id: producto.id }, { title: producto.title, price: producto.price, thumbnail: producto.thumbnail })
    
  }

  async delete ( id) {
    return await Producto.deleteOne( {id })
  }

  getMocksProductos ( cantidad ) {
    let productos = []
    
    if(cantidad == 0) {
      throw Error('No hay productos')
    } 

    if(!cantidad) {
      cantidad = 10
    }

    for(let i = 0; i < cantidad; i++) {
      productos.push({
        id: i,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
      })
    } 
    return productos
  }

}


module.exports = ProductoBD