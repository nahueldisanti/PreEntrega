const fs = require('fs');
const { builtinModules } = require('module');

class Carts {
    constructor(){
        this.route = './cart.txt'
    }

    async getCart (req, res){
        try{
            const cart = JSON.parse(await fs.readFile(this.route,'utf-8'));
            res.send(cart);
        }catch(error){
            res.send(error)
        }
        }

    async createCart(req, res){
        try{
            if(fs.existsSync(this.route)){
                const cart = JSON.parse(await fs.readFile(this.route,'utf-8'));
                const lastCartId = cart[cart.length -1].id;
                const newCart = {
                    id: lastCartId + 1,
                    timestamp: new Date(),
                    productos: []
                }
                cart.push(newCart);
                const writeFile = await fs.writeFileSync(this.route, JSON.stringify(cart));
                res.send(newCart.id);
            }else {
                const cart = [];
                const newCart = {
                    id: 1,
                    timestamp: new Date(),
                    productos: []
                }
                cart.push(newCart);
                await fs.writeFile(this.route, JSON.stringify(cart));
                res.send(newCart.id)
            }

        }catch(error){
            res.send(error);        
        }
    }

    async deleteCartById(req, res){
        try{
            const cart = await this.getCart();
            const {id} = req.params;
            const filteredCart = JSON.stringify(cart.filter((i) => i.id !== id));
            await fs.writeFileSync(this.route, filteredCart);
            res.send(`El carrito con id ${id} ha sido eliminado con exito!`)
        }catch(error){
            res.send(error);
        }
    }

    async getCartProductsById(res, req){
        try{
            const {id} = req.params; 
            const cart = this.getCart();
            const foundCart = cart.find( cart => cart.id === parseInt(id));
            if(foundCart.length !== 0){
                console.log(`Estos son los articulos del carrito con id:${id}: ${foundCart.productos}`);
                res.send(foundCart);
            }else{
                res.send(error)
                return({error : 'Id no encontrado'});
            }
        }catch(error){
            res.send(error)
        }
    }

    async saveProductsToCart(req, res){
        try{
            const cart = this.getCart();
            const items = JSON.parse(await fs.readFile('./productos.txt'), 'urf-8');
            const {id_carrito, id} = req.params;
            const foundCart = cart.find( cart => cart.id === parseInt(id_carrito));
            const cartProducts = foundCart.productos
            const foundItem = items.find(item => item.id === parseInt(id));
            
            if(foundCart === undefined){
                res.send(`El carrito con id ${id_carrito} no se encontro`)
            }else{
                if(foundItem === undefined){
                    res.send(`Producto con el id:${id} no encontrado`)
                }else{ 
                    cartProducts.push(foundItem);
                    await fs.writeFile(this.route, JSON.stringify(cart));
                    res.send(`El product con id: ${id} ha sido agregado exitosamente al carrito con id ${id_carrito}`);
                }
            }
        }catch(error){
            res.send(error)
        }
    }
    async deleteProductsInCart(req, res){
        try{
            const cart = this.getCart();
            const items = JSON.parse(await fs.readFile('./productos.txt'), 'urf-8');
            const {id_carrito, id} = req.params;
            const foundCart = cart.find( cart => cart.id === parseInt(id_carrito));
            const cartProducts = foundCart.productos
            const foundItem = items.find(item => item.id === parseInt(id));
            
            if(foundCart === undefined){
                res.send(`El carrito con id ${id_carrito} no se encontro`)
            }else{
                if(foundItem === undefined){
                    res.send(`Producto con el id:${id} no encontrado`)
                }else{ 
                    cartProducts.push(foundItem);
                    await fs.writeFile(this.route, JSON.stringify(cart));
                    res.send(`El product con id: ${id} ha sido agregado exitosamente al carrito con id ${id_carrito}`);
                }
            }
        }catch(error){
            res.send(error)
        }
    }
}



const cartController = new Carts();
module.exports = cartController