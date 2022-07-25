const ProductService = require("../services/product-service");

class ProductController {
    static async getProducts(req, res) {
        const products = await ProductService.getAllProducts();

        if (!products) {
            res.statusCode = 404
            return res.json({
                success: false,
                message: 'Não há produtos cadastrados'
            });
        }

        res.json({
            success: true,
            products
        })
    }

    static async addProduct(req, res) {
        const { nome, descricao, categoria } = req.body;

        const product = await ProductService.addProduct(nome, descricao, categoria);

        if (!product) {
            res.statusCode = 400,
                res.json({
                    success: false,
                    message: `Produto ${nome} já existe na base de dados`
                })
        }

        res.json({
            success: true,
            product
        });
    }

    static async getProduct(req, res) {
        const { id } = req.params;

        const product = await ProductService.findProductById(id);

        if (!product) {
            res.statusCode = 404;
            return res.json({
                success: false,
                message: `Produto não existe na base de dados.`
            });
        }

        return res.json({
            success: true,
            product
        });
    }

    static async updateProduct(req, res) {
        const { id } = req.params;
        const { nome, descricao, categoria } = req.body;

        const product = await ProductService.updateProduct({ id, nome, descricao, categoria });

        if (!product) {
            res.statusCode = 400
            res.json({
                success: false,
                message: 'Ocorreu um erro'
            });
        }

        res.json({
            success: true,
            product
        });
    }

    static async deleteProduct(req, res) {
        const { id } = req.params;

        const product = await ProductService.deleteProduct(id);

        if (!product) {
            res.statusCode = 400;
            res.json({
                succes: false,
                message: 'Falha ao deletar'
            });
        }

        res.json({
            success: true,
            product
        });
    }
}

module.exports = ProductController;