const express = require('express')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const dotenv = require('dotenv')
const routes =  require('./routes/index') 
const ProductoBD = require('./ProductoBD')
const MensajeBD = require('./MensajeBD') 
const path = require('path')

const mongoose = require('mongoose') 

const redisClient = redis.createClient()

exports.producto = new ProductoBD()
exports.mensaje = new MensajeBD()

dotenv.config() 
const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.json())

let minuto = 60000

app.use(session({
  secret: 'palabra clave',
  resave: false,
  saveUninitialized: true,
  rolling: true,
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    client: redisClient,
    ttl: 10
  }),
  cookie: {
    secure: false,
    expires: new Date(Date.now() + minuto),
    maxAge: minuto
  }
}))

app.use(function(req, res, next) {
  // req.session.cookie.expires = new Date(Date.now() + minuto)
  if(req.session.usuario || req.url.includes('login') || req.url.includes('deslogueo') || req.url.includes('styles')) {
    next()
  } else {
    res.redirect('/login.html')
  }
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'))
})


app.use(express.static(__dirname + '/views'))

app.use('/api', routes)

// server socket.io
const server = require('http').createServer(app);
exports.io = require('socket.io')(server);
require('./sockets/index')

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if(err) throw err;
  
  console.log('Base de datos ONLINE');
});

server.listen( process.env.PORT, () => console.log(`Escuchando en el puerto ${process.env.PORT}`))

server.on('error', (err) => { console.log(`Error de conexion: ${err}`)})
