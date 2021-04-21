const { Router } = require('express')
const path = require('path')

const { producto } = require('../index')

const router = Router()

router.get('/productos/vista-test', (req, res) => {
  try {
    res.status(200).json(producto.getMocksProductos( Number(req.query.cant)  ))
  } catch (err) { return res.status(500).json( { error: err.message })}
})

router.get('/productos', async (req, res) => {
  try {
    res.status(200).json(await producto.getAll())
  } catch (err) { return res.status(500).json( { error: err.message })}
})

router.get('/productos/:id', async (req, res) => {
  try {
    res.status(200).json(await producto.getOne(+req.params.id))
  } catch (err) { return res.status(500).json( { error: err.message })}
})

router.post('/productos', async (req, res) => {
  try {    
    if(!req.body.title && req.body.title == '') {
      throw Error('Falta el titulo del producto')
    }

    res.status(200).json(await producto.add(req.body))
  } catch (err) { return res.status(500).json({ error: err.message || 'Error'})}
})

router.put('/productos/:id', async (req, res) => {
  try {
    res.status(200).json(await producto.update(req.body))
  } catch (err) { return res.status(500).json({ error: err.message || 'Error'})}
})

router.delete('/productos/:id', async (req, res) => {
  try {
    res.status(200).json(await producto.delete(+req.params.id))
  } catch (err) { return res.status(500).json({ error: err.message || 'Error'})}
})


router.post('/login', (req, res) => {
  req.session.usuario = req.body.usuario
  res.cookie('usuario', req.session.usuario)
  res.redirect('/')
  
})

router.get('/cerrarSesion', (req, res) => {
  req.session.destroy( err => {
    if(err) console.log(err)
    res.redirect('/deslogueo.html')
  })
  
})




module.exports = router