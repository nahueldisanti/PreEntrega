const {Router} = require('express')
const cartController = require('../../controllers/cart/index.js')

const routerCarts = new Router();

routerCarts.get('/:id/productos', cartController.getCartProductsById )
routerCarts.post('/', cartController.createCart)
routerCarts.post('/:id_carrito/productos/:id', cartController.saveProductsToCart)
routerCarts.delete('/:id', cartController.deleteCartById)
routerCarts.delete('/:id/productos/:id_prod', cartController.deleteProductsInCart)


module.exports = routerCarts