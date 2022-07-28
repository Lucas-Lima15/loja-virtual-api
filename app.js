const express = require('express');
const bodyParser = require('body-parser');

const ProdutoRoute = require('./routes/product');
const MongoDB = require('./util/mongoDb');

class App {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.express.listen(8080, () => {
            console.log(`Servidor rodando na porta 8080 as ${new Date()}`);
        })
    }

    database() {
        MongoDB.connect()
    }

    middlewares() {
        this.express.use(bodyParser.json());
    }

    routes() {
        this.express.use('/produto', ProdutoRoute);
    }
}

module.exports = App;