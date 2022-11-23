const express = require('express');
const app = express();
const routerCart = require("./routes/cart")
const routerProduct = require("./routes/products")

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/cart', routerCart);
app.use('/api/products', routerProduct);

const server = app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`);
});
app.get('/api', (req, res) => res.send('Bienvenidos a la api'));