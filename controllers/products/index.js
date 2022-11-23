const fs = require('fs');

class Items {
    constructor(){
        {
            this.route = './items.json'
        }
    }

    async getAll(req, res, next) {
        try{
            const items = JSON.parse(fs.readFileSync(this.route, 'utf-8'));
            res.send(items);
    } catch(error){
        res.send(error);
    }};

    async getById (req, res, next) {
        try{
            const {id} = req.params
            const items = this.getAll()
            const foundItem = items.find( i => i.id === parseInt(id));
            if(foundItem.length !== 0){
                console.log(`Este es el articulo encontrado: ${foundItem}`);
                res.send(foundItem);
            }else{
                res.send(error)
                return({error : 'Id no encontrado'});
            }
        }catch(error){
            res.send(error)
        }
    }

    async save(req, res, next){
        try{
            if(fs.existsSync(this.route)){
                const data = this.getAll();
                const lastItemId = data[data.length - 1].id;
                const newItem = req.body
                newItem.id = lasItemId + 1
                data.push(newProduct)
                const writeFile = await(this.route, JSON.stringify(data))
                res.status(201).send("Producto Guardado")

            }else {
                const data = [];
                const newItem = req.body;
                newItem.id = 1
                data.push(newItem);
                await fs.writeFile(this.route, JSON.stringify(data));
            }

        }catch(error){
            res.send(error)

        }
    }

    async updateItem(req, res, next) {
        try{
            const items = this.getAll();
            const {id} = req.params;
            const {title, price, thumbnail} = req.body;
            const newItem = {
                title:title,
                price:price,
                thumbnail:thumbnail,
                id: id
            };
            items[id] = newItem;
            const itemsJson = JSON.stringify(items);
            fs.writeFileSync(this.file, itemsJson);
            res.send(`Producto con id:${id} actualizado correctamente`)
        }catch(error){
            res.send(error)
        }

    }

    async deleteAll(req, res, next){
        try{
            fs.writeFileSync(this.file,'');
            console.log('Elementos eliminados');
        }catch(error){
            res.send(error);
        }
    }

    async deleteById(req, res, next) {
        try{   
            const {id} = req.params;
            const info = this.getAll()
            const newInfoFiltered = info.filter((i) => i.id !== id);
            const newInfoFilteredJson = JSON.stringify(newInfoFiltered);
            fs.writeFileSync(this.file, newInfoFilteredJson);
            res.send(`El articulo con id ${id} ha sido eliminado con exito!`);
        } catch(error) {
            res.send(error)
        }
    }

}



const itemsController = new Items();
module.exports =itemsController