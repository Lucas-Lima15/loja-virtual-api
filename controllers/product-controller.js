const Product = require("../models/product");
const ProductService = require("../services/product-service");

class ShopController {
    async index(req, res) {
        const products = await ProductService.getAllProducts();

        res.json(
            {
                produtos: ProductService.getProductsNome(products)
            }
        );
    }

    async addProduct(req, res) {
        const { nome } = req.body;

        const product = await ProductService.addProduct({nome});

        res.json(product);
    }

    async deleteProduct(req, res) {
        const { nome } = req.body;

        const product = await ProductService.deleteProduct({nome});

        if (!product) {
            res.statusCode = 400;
            res.json({
                
            })
        }

        res.json(product);
    }
}

module.exports = new ShopController();