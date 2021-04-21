let form = document.querySelector('#form')
let title = document.querySelector('#title')
let price = document.querySelector('#price')
let thumbnail = document.querySelector('#thumbnail')
let tbody = document.querySelector('tbody')
let table = document.querySelector('table')

let chat = document.querySelector('#chat')
let email = document.querySelector('#email')
let message = document.querySelector('#message')
let nombre = document.querySelector('#nombre')
let apellido = document.querySelector('#apellido')
let edad = document.querySelector('#edad')
let alias = document.querySelector('#alias')
let avatar = document.querySelector('#avatar')
let usuario = document.querySelector('#usuario')

let enviarMensaje = document.querySelector('#enviarMensaje')
let lista = document.querySelector('#lista')


form.addEventListener('submit', sendData)
email.addEventListener('input', validarEmail)
enviarMensaje.addEventListener('click', sendMessage)

let cookies = document.cookie.split(';')
let nombreUsuario = ''
for(let i in cookies) {
  let index = cookies[i].search('usuario')
  let indexString = cookies[index].indexOf('=')
  nombreUsuario = cookies[i].substring(indexString + 1, cookies[i].length)
}
usuario.innerText = `Bienvenido ${nombreUsuario}`

function sendData (event) {
  event.preventDefault()
  socket.emit('agregarProducto', JSON.stringify({title: title.value, price: price.value, thumbnail: thumbnail.value}))
}

function sendMessage (event) {
  event.preventDefault()
  socket.emit('message', {
    author: {
      email: email.value,
      nombre: nombre.value,
      apellido: apellido.value,
      edad: edad.value,
      alias: alias.value,
      avatar: avatar.value
    },
    text: message.value
  })
  message.value = ''
}

function crearRegistroTabla ( producto ) {
  let tr = document.createElement('tr')
  tr.appendChild(crearColumnaTabla(producto.title))
  tr.appendChild(crearColumnaTabla(producto.price))
  tr.appendChild(crearColumnaTabla(producto.thumbnail))
  tr.appendChild(botonEditar())
  tbody.appendChild(tr)
}

function crearColumnaTabla ( valor ) {
  let td = document.createElement('td')
  if(valor.toString().includes('http')) {
    let img = document.createElement('img')
    img.src = valor
    img.className = "rounded"
    img.width = "50"
    img.height = "50"
    td.appendChild(img)
  } else {
    td.innerText = valor
  }
  return td
}

function botonEditar () {
  let td = document.createElement('td')
  let svg = document.createElement('svg')
  let path = document.createElement('path')

  svg.xmlns = "http://www.w3.org/2000/svg"
  svg.width = "16"
  svg.height = "16"
  svg.fill = "currentColor"
  svg.className = "bi bi-pencil-fill"
  svg.viewBox = "0 0 16 16"

  path.d = "M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
  svg.appendChild(path)
  td.appendChild(svg)


  return td
}

function validarEmail() {
  let format = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if (format.test(email.value)) {
    enviarMensaje.disabled = false
  } else {
    enviarMensaje.disabled = true
  }
}

function crearMensaje ( mensaje ) {

  console.log(mensaje)
  let li = document.createElement('li')
  let spanEmail = document.createElement('span')
  let spanFechaHora = document.createElement('span')
  let spanMensaje = document.createElement('span')
  spanEmail.innerText = mensaje.author.email
  spanEmail.className = 'emailStyle'
  // spanFechaHora.innerText = mensaje.author.fechaHora
  // spanFechaHora.className = 'fechaHoraStyle'
  spanMensaje.innerText = mensaje.text
  spanMensaje.className = 'mensajeStyle'

  li.appendChild(spanEmail)
  li.appendChild(spanFechaHora)
  li.appendChild(spanMensaje)

  lista.appendChild(li)
}


let socket = io()
let sessionID = null

socket.on('connect', () => {
  console.log('conectado')



  socket.on('disconnect', () => {
    console.log('desconectado')
  })
  
  socket.on('productos', (data) => {
    tbody.innerHTML = ''
    let productos = JSON.parse(data)
    productos.forEach( producto => crearRegistroTabla(producto))
  })

  socket.on('productoAgregado', (data) => {
    crearRegistroTabla(JSON.parse(data))
  })

  socket.on('message', (data) => {
    console.log(data)
    crearMensaje(data)
  })

  socket.on('todosLosMensajes', (data) => {
    let mensajes = JSON.parse(data)
    console.log({mensajes})
    
    // crearMensaje(data)
  })
})





