class Admin{
    constructor(){
        this.isAdmin = true
    }

    async validateAdmin (req, res, next){
        if(this.isAdmin) {
            next()
        }else{
            res.send({error : -1, description: "ruta 'x' método 'y' no autorizada" })
        }
    }
}

const admin = new Admin
module.exports = admin