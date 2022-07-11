const Product = require("../models/product");

class ProductService {
    async getAllProducts() {
        return await Product.find({});
    }

    async addProduct(product) {
        const existProd = await Product.exists(product);

        if (existProd) {
            return {
                success: false,
                message: 'Produto já existe'
            }
        }

        const prodCreated = await Product.create(product);

        return {
            success: true,
            message: 'Produto criado com sucesso',
            produto: prodCreated
        };
    }

    async deleteProduct(product) {
        const existProd = await Product.findOne(product);

        if (!existProd) {
            return null
        }

        const prodDeleted = await Product.deleteOne(product);

        return prodDeleted;
    }

    getProductsNome(products) {
        return products.map(product => product.nome);
    }
}

module.exports = new ProductService()