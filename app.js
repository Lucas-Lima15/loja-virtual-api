const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const ShopRoute = require('./routes/product');

class App {
    constructor() {
        this.express = express();
        
        this.database();
        this.middlewares();
        this.routes();

        this.express.listen(8080, () => {
            console.log(`Servidor rodando na porta 8080 as ${new Date()}`);
        })
    }

    database() {
        mongoose.connect('mongodb://localhost:27017/loja-virtual');
    }

    middlewares() {
        this.express.use(bodyParser.json());
    }

    routes() {
        this.express.use('/product', ShopRoute);
    }
}

module.exports = new App().express;