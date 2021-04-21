let usuario = document.querySelector('#usuario')


let cookies = document.cookie.split(';')
let nombreUsuario = ''
for(let i in cookies) {
  let index = cookies[i].search('usuario')
  let indexString = cookies[index].indexOf('=')
  nombreUsuario = cookies[i].substring(indexString + 1, cookies[i].length)
}
usuario.innerText = `Hasta luego ${nombreUsuario}`

setTimeout( () => {
  console.log('redirect');
  window.location.replace('http://localhost:8080/login.html')
}, 2000)
