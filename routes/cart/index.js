const {Router} = require('express')

const routerCarts = new Router();

routerCarts.get('/', (req, res) =>res.send('Ruta carrito'))
routerCarts.post('/', (req, res) =>res.send('Ruta carrito'))
routerCarts.post('/', (req, res) =>res.send('Ruta carrito'))
routerCarts.delete('/', (req, res) =>res.send('Ruta carrito'))
routerCarts.delete('/', (req, res) =>res.send('Ruta carrito'))







module.exports = routerCarts