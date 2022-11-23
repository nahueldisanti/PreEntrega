const {Router} = require('express')
const itemsController = require('../../controllers/products/index.js')
const {validateAdmin} = require('../../admin/index.js')

const routerProduct = new Router();

routerProduct.get('/', itemsController.getAll);
routerProduct.get('/:id?', itemsController.getById);
routerProduct.post('/',validateAdmin, itemsController.save);
routerProduct.put('/:id?',validateAdmin, itemsController.updateItem);
routerProduct.delete('/:id?',validateAdmin, itemsController.deleteById);

module.exports = routerProduct        