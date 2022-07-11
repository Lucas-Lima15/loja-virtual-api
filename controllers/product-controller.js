const ProdutoService = require("../services/product-service");

class ProdutoController {
    async getProdutos(req, res) {
        const response = await ProdutoService.getAllProducts();

        if (!response.success) {
            res.statusCode = 404
        }

        res.json(response)
    }

    async addProduto(req, res) {
        const { nome, descricao, categoria } = req.body;

        const product = await ProdutoService.addProduct(nome, descricao, categoria);

        res.json(product);
    }

    async deletProduto(req, res) {
        const { nome } = req.body;

        const product = await ProdutoService.deleteProduct({ nome });

        if (!product) {
            res.statusCode = 400;
            res.json({

            })
        }

        res.json(product);
    }
}

module.exports = new ProdutoController();