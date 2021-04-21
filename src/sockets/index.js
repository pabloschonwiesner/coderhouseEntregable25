const { producto, mensaje, io} = require('../index')

io.on('connection', (client) => {
  console.log('cliente conectado')
  io.on('disconnect', () => {
    console.log('cliente desconectado')
  })

  client.on('agregarProducto', async (data) => {
    let productoAgregado = await producto.add(JSON.parse(data))
    io.sockets.emit('productoAgregado', JSON.stringify(productoAgregado))
    
  })

  client.on('message', async (data) => {
    let mensajeAgregado = await mensaje.add(data)
    io.sockets.emit('message', JSON.stringify(mensajeAgregado))
  })

  async function emitirListaProductos() {
    let listaProductos = JSON.stringify(await producto.getAll())
    client.emit('productos', listaProductos)
  }

  async function emitirListaMensajes() {
    let  mensajes = await mensaje.getAll()
    client.emit('todosLosMensajes', JSON.stringify(mensajes))
  }

  emitirListaProductos()
  emitirListaMensajes()
})